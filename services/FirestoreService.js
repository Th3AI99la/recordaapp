// services/FirestoreService.js
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const TRIPS_COLLECTION = 'trips';

export const addTrip = async (tripData) => {
  try {
    const docRef = await addDoc(collection(db, TRIPS_COLLECTION), tripData);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao adicionar viagem: ", error);
    throw error;
  }
};

export const getTripsByUserId = async (userId) => {
  try {
    const q = query(collection(db, TRIPS_COLLECTION), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push({ id: doc.id, ...doc.data() });
    });
    return trips;
  } catch (error) {
    console.error("Erro ao buscar viagens: ", error);
    throw error;
  }
};

export const updateTrip = async (tripId, newData) => {
  try {
    const tripRef = doc(db, TRIPS_COLLECTION, tripId);
    await updateDoc(tripRef, newData);
  } catch (error) {
    console.error("Erro ao atualizar viagem: ", error);
    throw error;
  }
};

export const deleteTrip = async (tripId) => {
  try {
    await deleteDoc(doc(db, TRIPS_COLLECTION, tripId));
  } catch (error) {
    console.error("Erro ao deletar viagem: ", error);
    throw error;
  }
};
