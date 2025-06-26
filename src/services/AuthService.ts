import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from './firebaseConfig';

export const registerUser = (email: string, password: string): Promise<User> => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => userCredential.user
  );
};

export const loginUser = (email: string, password: string): Promise<User> => {
  return signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => userCredential.user
  );
};

export const logoutUser = (): Promise<void> => {
  return signOut(auth);
};