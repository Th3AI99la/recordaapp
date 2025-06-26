import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RootStackParamList, Trip } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';
import GlobalStyles from '../styles/GlobalStyles';
import { addTrip, updateTrip } from '../services/FirestoreService';
import { uploadImage } from '../services/StorageService';
import { auth } from '../services/firebaseConfig';

type Props = StackScreenProps<RootStackParamList, 'TripForm'>;

const TripFormScreen = ({ navigation, route }: Props) => {
  const editingTrip = route.params?.trip;
  const [title, setTitle] = useState(editingTrip?.title || '');
  // ... (outros estados para description, cityCountry, etc.)
  const [date, setDate] = useState(editingTrip ? new Date(editingTrip.date) : new Date());
  const [imageUri, setImageUri] = useState<string | null>(editingTrip?.imageUrl || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: editingTrip ? 'Editar Viagem' : 'Registrar Nova Viagem' });
  }, [editingTrip]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSaveTrip = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }
    setLoading(true);
    let imageUrl = imageUri;
    if (imageUri && imageUri !== editingTrip?.imageUrl) {
      try {
        const imagePath = `trip_images/${userId}/${Date.now()}.jpg`;
        imageUrl = await uploadImage(imageUri, imagePath);
      } catch (error) {
        setLoading(false);
        Alert.alert("Erro de Upload", "Não foi possível fazer upload da imagem.");
        return;
      }
    }
    const tripData = {
      title,
      description: '', // adicione os outros estados aqui
      cityCountry: '', // adicione os outros estados aqui
      date: date.toISOString(),
      imageUrl,
      userId,
    };
    try {
      if (editingTrip) {
        await updateTrip(editingTrip.id, tripData);
      } else {
        await addTrip(tripData as Omit<Trip, 'id'>);
      }
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Erro ao Salvar", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>{editingTrip ? 'Editar Viagem' : 'Nova Viagem'}</Text>
      <Input label="Título" value={title} onChangeText={setTitle} />
      {/* ... outros Inputs ... */}
      <Button title="Selecionar Imagem" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
      <Button title={loading ? "Salvando..." : "Salvar Viagem"} onPress={handleSaveTrip} disabled={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagePreview: { width: '100%', height: 200, marginTop: 10 },
});

export default TripFormScreen;