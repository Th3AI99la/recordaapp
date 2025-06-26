import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Platform } from 'react-native';

// Importações do Auth para múltiplas plataformas
import {
  initializeAuth,
  getReactNativePersistence, // Para o celular
  indexedDBLocalPersistence, // Para a Web
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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

// Para evitar re-inicialização, verificamos se o app já existe
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicialização do Auth que funciona tanto no Celular quanto na Web
const auth = initializeAuth(app, {
  persistence: Platform.OS === 'web'
    ? indexedDBLocalPersistence 
    : getReactNativePersistence(ReactNativeAsyncStorage), 
});

// Inicialização dos outros serviços
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };