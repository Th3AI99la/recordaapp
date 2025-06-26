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

const firebaseConfig = {
  apiKey: "AIzaSyCx446zCuLCEkctM9cc8Pp1fY3lg2v425c",
  authDomain: "recordaapp-ab515.firebaseapp.com",
  projectId: "recordaapp-ab515",
  storageBucket: "recordaapp-ab515.firebasestorage.app",
  messagingSenderId: "527758702637",
  appId: "1:527758702637:web:9a25a37207141fb9f220a4",
  measurementId: "G-WN60NS388X"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: Platform.OS === 'web'
    ? indexedDBLocalPersistence
    : getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };