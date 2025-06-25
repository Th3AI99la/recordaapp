// services/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
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

// INICIALIZAÇÃO CORRETA DO AUTH
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };