// services/StorageService.js
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebaseConfig';

export const uploadImage = async (uri, path) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem: ", error);
    throw error;
  }
};

export const deleteImage = async (fileUrl) => {
  try {
    const imageRef = ref(storage, fileUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Erro ao deletar imagem: ", error);
    throw error;
  }
};
