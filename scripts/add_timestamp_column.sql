-- Adiciona coluna de timestamp para registrar quando foi cadastrado
-- Execute este script no Neon Dashboard SQL Editor

-- Adiciona a coluna se não existir
ALTER TABLE public.cadastros 
ADD COLUMN IF NOT EXISTS "CADASTRADO" TIMESTAMP;

-- Cria índice para melhor performance em consultas ordenadas
CREATE INDEX IF NOT EXISTS idx_cadastros_cadastrado 
ON public.cadastros("CADASTRADO" DESC);

-- Comentário na coluna
COMMENT ON COLUMN public.cadastros."CADASTRADO" IS 'Data e hora em que o registro foi cadastrado no sistema';
