// src/services/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Platform } from 'react-native';
import {
  initializeAuth,
  getReactNativePersistence,
  indexedDBLocalPersistence,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration (COM AS SUAS NOVAS CREDENCIAIS)
const firebaseConfig = {
  apiKey: "AIzaSyAokcULvK7ZJzIRr95GM_9khpk03ru9cG4",
  authDomain: "recorda-app-v2.firebaseapp.com",
  projectId: "recorda-app-v2",
  storageBucket: "recorda-app-v2.firebasestorage.app",
  messagingSenderId: "9529945619",
  appId: "1:9529945619:web:b6cedb0531349f060e59e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with platform-specific persistence
const auth = initializeAuth(app, {
  persistence: Platform.OS === 'web'
    ? indexedDBLocalPersistence
    : getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize other services
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };