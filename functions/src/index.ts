import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as XLSX from "xlsx";
import { Pool } from "pg";
import * as cors from "cors";
import * as Busboy from "busboy";

// Inicializa o Firebase Admin SDK
admin.initializeApp();

// Define os segredos a partir das variáveis de ambiente
const NEON_DB_URL = process.env.NEON_DB_URL;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;

// Configura o pool de conexões com o Neon DB
const pool = new Pool({
    connectionString: NEON_DB_URL,
});

// Configura CORS
const corsHandler = cors({ origin: true });

/**
 * Cloud Function para upload de arquivo Excel.
 */
export const uploadFile = functions.https.onRequest(async (req, res) => {
    // Aplica CORS
    corsHandler(req, res, async () => {
        // Verifica se é POST
        if (req.method !== 'POST') {
            res.status(405).json({ error: 'Método não permitido' });
            return;
        }

        try {
            // Verifica autenticação
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(401).json({ error: 'Token de autenticação não fornecido' });
                return;
            }

            const idToken = authHeader.split('Bearer ')[1];
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            const userId = decodedToken.uid;

            functions.logger.info(`Upload iniciado pelo usuário: ${userId}`);

            // Processa o arquivo multipart
            const fileData = await processMultipartFile(req);
            
            if (!fileData) {
                res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
                return;
            }

            const { fileBuffer, fileName, fileSize } = fileData;
            
            functions.logger.info(`Processando arquivo: ${fileName} (${fileSize} bytes)`);

            // Validação de tamanho
            if (fileSize > 10 * 1024 * 1024) {
                res.status(400).json({ error: 'Arquivo muito grande. Limite: 10MB' });
                return;
            }

            // Lê a planilha com XLSX
            const workbook = XLSX.read(fileBuffer, { type: "buffer" });
            
            if (!workbook.SheetNames.length) {
                res.status(400).json({ error: 'Planilha não contém abas válidas' });
                return;
            }
            
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            if (!jsonData.length) {
                res.status(400).json({ error: 'Planilha está vazia ou não contém dados válidos' });
                return;
            }

            // Validação dos dados
            const requiredFields = ['ARTISTA', 'MUSICA', 'ISRC', 'UPC'];
            const firstRow = jsonData[0] as any;
            const missingFields = requiredFields.filter(field => !(field in firstRow));
            
            if (missingFields.length > 0) {
                res.status(400).json({ 
                    error: `Colunas obrigatórias não encontradas: ${missingFields.join(', ')}` 
                });
                return;
            }

            const totalRecords = jsonData.length;
            functions.logger.info(`Processando ${totalRecords} registros`);
            
            const progressRef = admin.firestore().collection("progress").doc(userId);
            await progressRef.set({ 
                total: totalRecords, 
                processed: 0, 
                status: 'processing',
                fileName: fileName,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            });

            // Insere os dados no Neon DB
            const client = await pool.connect();
            let processedRecords = 0;
            
            try {
                await client.query('BEGIN');
                
                for (let i = 0; i < totalRecords; i++) {
                    const row: any = jsonData[i];
                    
                    // Validação básica dos dados da linha
                    if (!row.ARTISTA || !row.MUSICA) {
                        functions.logger.warn(`Linha ${i + 1} ignorada - dados obrigatórios faltando`);
                        continue;
                    }
                    
                    const query = {
                        text: `INSERT INTO cadastros (ARTISTA, MUSICA, ISRC, UPC, created_at) 
                               VALUES ($1, $2, $3, $4, NOW()) 
                               ON CONFLICT (ISRC) DO NOTHING`,
                        values: [
                            String(row.ARTISTA).trim(),
                            String(row.MUSICA).trim(),
                            row.ISRC ? String(row.ISRC).trim() : null,
                            row.UPC ? String(row.UPC).trim() : null
                        ],
                    };
                    
                    await client.query(query);
                    processedRecords++;
                    
                    // Atualiza o progresso a cada 10 registros ou no final
                    if (processedRecords % 10 === 0 || processedRecords === totalRecords) {
                        await progressRef.update({ processed: processedRecords });
                    }
                }
                
                await client.query('COMMIT');
                await progressRef.update({ 
                    status: 'completed',
                    completedAt: admin.firestore.FieldValue.serverTimestamp()
                });
                
                functions.logger.info(`Processamento concluído: ${processedRecords}/${totalRecords} registros`);
                res.status(200).json({ 
                    success: true,
                    message: `${processedRecords} de ${totalRecords} registros importados com sucesso!`,
                    processed: processedRecords,
                    total: totalRecords
                });
                
            } catch (dbError) {
                await client.query('ROLLBACK');
                throw dbError;
            } finally {
                client.release();
            }
            
        } catch (error: any) {
            functions.logger.error("Erro ao processar dados:", error);
            
            // Tenta atualizar o progresso com erro
            try {
                const authHeader = req.headers.authorization;
                if (authHeader && authHeader.startsWith('Bearer ')) {
                    const idToken = authHeader.split('Bearer ')[1];
                    const decodedToken = await admin.auth().verifyIdToken(idToken);
                    const userId = decodedToken.uid;
                    
                    const progressRef = admin.firestore().collection("progress").doc(userId);
                    await progressRef.update({ 
                        status: 'error',
                        error: error.message,
                        errorAt: admin.firestore.FieldValue.serverTimestamp()
                    });
                }
            } catch (progressError) {
                functions.logger.error("Erro ao atualizar progresso:", progressError);
            }
            
            res.status(500).json({ 
                error: error.message || "Erro interno do servidor"
            });
        }
    });
});

/**
 * Processa arquivo multipart/form-data
 */
async function processMultipartFile(req: functions.Request): Promise<{fileBuffer: Buffer, fileName: string, fileSize: number} | null> {
    return new Promise((resolve, reject) => {
        const busboy = new Busboy({ headers: req.headers });
        let fileBuffer: Buffer | null = null;
        let fileName = '';
        let fileSize = 0;

        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            if (fieldname === 'file') {
                fileName = filename || 'arquivo.xlsx';
                const chunks: Buffer[] = [];
                
                file.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                
                file.on('end', () => {
                    fileBuffer = Buffer.concat(chunks);
                    fileSize = fileBuffer.length;
                });
            } else {
                file.resume(); // Ignora outros campos
            }
        });

        busboy.on('finish', () => {
            if (fileBuffer) {
                resolve({ fileBuffer, fileName, fileSize });
            } else {
                resolve(null);
            }
        });

        busboy.on('error', (error) => {
            reject(error);
        });

        req.pipe(busboy);
    });
}

/**
 * Cloud Function para disparar o workflow do Playwright no GitHub Actions.
 */
export const triggerPlaywright = functions.https.onCall(async (_data, context) => {
    // Valida se o usuário está autenticado
    if (!context.auth) {
        throw new functions.https.HttpsError(
            "unauthenticated", 
            "A função deve ser chamada por um usuário autenticado."
        );
    }

    const userId = context.auth.uid;
    functions.logger.info(`Trigger Playwright iniciado pelo usuário: ${userId}`);

    try {
        // Validação das variáveis de ambiente
        if (!GITHUB_TOKEN) {
            functions.logger.error("GITHUB_TOKEN não configurado");
            throw new functions.https.HttpsError(
                "failed-precondition",
                "Token do GitHub não configurado. Verifique as variáveis de ambiente."
            );
        }

        if (!GITHUB_REPO) {
            functions.logger.error("GITHUB_REPO não configurado");
            throw new functions.https.HttpsError(
                "failed-precondition",
                "Repositório do GitHub não configurado. Verifique a variável GITHUB_REPO."
            );
        }

        const fetch = (await import("node-fetch")).default;
        const workflowId = "run-playwright.yml";
        const url = `https://api.github.com/repos/${GITHUB_REPO}/actions/workflows/${workflowId}/dispatches`;

        functions.logger.info(`Disparando workflow: ${url}`);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github+json",
                "Content-Type": "application/json",
                "User-Agent": "Firebase-Cloud-Function/1.0"
            },
            body: JSON.stringify({ ref: "main" }),
        });

        functions.logger.info(`Resposta do GitHub: ${response.status} ${response.statusText}`);

        if (response.status === 204) {
            functions.logger.info("Workflow disparado com sucesso");
            return {
                success: true,
                message: "Workflow disparado com sucesso! Acompanhe o progresso na aba Actions do GitHub.",
                workflowUrl: `https://github.com/${GITHUB_REPO}/actions`
            };
        } else if (response.status === 404) {
            const errorMessage = `Workflow não encontrado. Verifique se o arquivo ${workflowId} existe no repositório ${GITHUB_REPO}`;
            functions.logger.error(errorMessage);
            throw new functions.https.HttpsError("not-found", errorMessage);
        } else if (response.status === 401) {
            const errorMessage = "Token do GitHub inválido ou expirado";
            functions.logger.error(errorMessage);
            throw new functions.https.HttpsError("unauthenticated", errorMessage);
        } else {
            let errorMessage = `Erro HTTP ${response.status}: ${response.statusText}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch {
                // Se não conseguir parsear JSON, usa a mensagem padrão
            }
            functions.logger.error(`Erro ao disparar workflow: ${errorMessage}`);
            throw new functions.https.HttpsError("internal", errorMessage);
        }

    } catch (error: any) {
        functions.logger.error("Erro ao disparar workflow:", {
            error: error.message,
            stack: error.stack,
            userId: userId
        });

        // Se já é um HttpsError, re-throw
        if (error instanceof functions.https.HttpsError) {
            throw error;
        }

        // Para outros erros, convert para HttpsError
        throw new functions.https.HttpsError(
            "internal",
            error.message || "Erro interno ao disparar workflow"
        );
    }
});