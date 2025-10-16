import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// As configurações do seu projeto Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços que vamos usar
export const auth = getAuth(app);
export const functions = getFunctions(app);
export const firestore = getFirestore(app);

// Conecta aos emuladores locais apenas em desenvolvimento
if (import.meta.env.DEV && import.meta.env.VITE_ENV === 'dev') {
  console.log("🔧 Conectando aos emuladores do Firebase...");
  try {
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectFunctionsEmulator(functions, "127.0.0.1", 5001);
    connectFirestoreEmulator(firestore, "127.0.0.1", 8181);
    console.log("✅ Emuladores conectados com sucesso!");
  } catch (error) {
    console.warn("⚠️ Erro ao conectar emuladores (podem já estar conectados):", error);
  }
} else {
  console.log("🌐 Usando serviços Firebase de produção");
}

export default app;
