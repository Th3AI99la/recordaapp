import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
  DocumentData,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Trip } from '../types'; 

const TRIPS_COLLECTION = 'trips';

export const addTrip = async (tripData: Omit<Trip, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, TRIPS_COLLECTION), tripData);
  return docRef.id;
};

export const getTripsByUserId = async (userId: string): Promise<Trip[]> => {
  const q = query(collection(db, TRIPS_COLLECTION), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const trips: Trip[] = [];
  querySnapshot.forEach((doc) => {
    trips.push({ id: doc.id, ...(doc.data() as Omit<Trip, 'id'>) });
  });
  return trips;
};

export const updateTrip = async (tripId: string, newData: Partial<Omit<Trip, 'id'>>): Promise<void> => {
  const tripRef = doc(db, TRIPS_COLLECTION, tripId);
  await updateDoc(tripRef, newData);
};

export const deleteTrip = async (tripId: string): Promise<void> => {
  await deleteDoc(doc(db, TRIPS_COLLECTION, tripId));
};