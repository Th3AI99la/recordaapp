// services/firebaseConfig.js
// Configurações do Firebase - substitua com suas próprias credenciais
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCx446zCuLCEkctM9cc8Pp1fY3lg2v425c",
  authDomain: "recordaapp-ab515.firebaseapp.com",
  projectId: "recordaapp-ab515",
  storageBucket: "recordaapp-ab515.firebasestorage.app",
  messagingSenderId: "527758702637",
  appId: "1:527758702637:web:9a25a37207141fb9f220a4",
  measurementId: "G-WN60NS388X"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
