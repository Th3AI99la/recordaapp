import {
  collection,
  addDoc,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  Unsubscribe,
  DocumentData,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Trip } from '../types';

const TRIPS_COLLECTION = 'trips';

export const listenToTrips = (
  userId: string,
  callback: (trips: Trip[]) => void
): Unsubscribe => {
  const q = query(collection(db, TRIPS_COLLECTION), where('userId', '==', userId));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const trips: Trip[] = [];
    querySnapshot.forEach((doc) => {
      trips.push({ id: doc.id, ...(doc.data() as Omit<Trip, 'id'>) });
    });
    // Ordena as viagens pela data mais recente
    trips.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    callback(trips);
  });

  // Retornamos a função de 'unsubscribe' para limpar o listener
  return unsubscribe;
};


export const addTrip = async (tripData: Omit<Trip, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, TRIPS_COLLECTION), tripData);
  return docRef.id;
};

export const updateTrip = async (tripId: string, newData: Partial<Omit<Trip, 'id'>>): Promise<void> => {
  const tripRef = doc(db, TRIPS_COLLECTION, tripId);
  await updateDoc(tripRef, newData);
};

export const deleteTrip = async (tripId: string): Promise<void> => {
  await deleteDoc(doc(db, TRIPS_COLLECTION, tripId));
};
