// src/services/firebaseConfig.ts

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Importações do Auth específicas para a Web
import {
  initializeAuth,
  indexedDBLocalPersistence, 
} from 'firebase/auth';

// Suas credenciais do Firebase para o projeto "recorda-app-v2"
const firebaseConfig = {
  apiKey: "AIzaSyAokcULvK7ZJzIRr95GM_9khpk03ru9cG4",
  authDomain: "recorda-app-v2.firebaseapp.com",
  projectId: "recorda-app-v2",
  storageBucket: "recorda-app-v2.firebasestorage.app",
  messagingSenderId: "9529945619",
  appId: "1:9529945619:web:b6cedb0531349f060e59e6"
};

// --- Inicialização Robusta do Firebase ---

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicialização do Auth para a Web
const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence,
});

// Inicialização dos outros serviços
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };