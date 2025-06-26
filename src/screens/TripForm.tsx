import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as FileSystem from 'expo-file-system'; 

import { RootStackParamList, Trip } from '../types';
import Input from '../components/Input';
import Button from '../components/Button';
import GlobalStyles from '../styles/GlobalStyles';
import { addTrip, updateTrip } from '../services/FirestoreService';
import { auth } from '../services/firebaseConfig';

type Props = StackScreenProps<RootStackParamList, 'TripForm'>;

const TripFormScreen = ({ navigation, route }: Props) => {
  const editingTrip = route.params?.trip;

  const [title, setTitle] = useState(editingTrip?.title || '');
  const [description, setDescription] = useState(editingTrip?.description || '');
  const [cityCountry, setCityCountry] = useState(editingTrip?.cityCountry || '');
  const [date, setDate] = useState(editingTrip ? new Date(editingTrip.date) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(editingTrip?.imageUrl || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: editingTrip ? 'Editar Viagem' : 'Registrar Nova Viagem' });
  }, [editingTrip]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar sua galeria de fotos.');
      return;
    }

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
    if (!title || !description || !cityCountry) {
        Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos.");
        return;
    }

    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    setLoading(true);
    let finalImageUrl: string | null = editingTrip?.imageUrl || null;

    // --- 2. LÓGICA DE SALVAMENTO LOCAL ---
    // Se uma nova imagem foi escolhida...
    if (imageUri && imageUri !== editingTrip?.imageUrl) {
      // Gera um nome de arquivo único
      const filename = imageUri.split('/').pop() || `${Date.now()}.jpg`;
      // Define um destino permanente no diretório de documentos do app
      const permanentUri = FileSystem.documentDirectory + filename;

      try {
        // Copia a imagem do local temporário (cache) para o local permanente
        await FileSystem.copyAsync({
          from: imageUri,
          to: permanentUri,
        });
        // A URL que salvaremos no Firestore agora é o caminho local permanente
        finalImageUrl = permanentUri;
      } catch (error) {
        console.error("Erro ao salvar imagem localmente:", error);
        Alert.alert("Erro", "Não foi possível salvar a imagem no dispositivo.");
        setLoading(false);
        return;
      }
    }
    // --- FIM DA LÓGICA DE SALVAMENTO LOCAL ---

    const tripData = {
      title,
      description,
      cityCountry,
      date: date.toISOString(),
      imageUrl: finalImageUrl, // <-- 3. SALVA O CAMINHO LOCAL NO FIRESTORE
      userId,
    };

    try {
      if (editingTrip) {
        await updateTrip(editingTrip.id, tripData);
        Alert.alert("Sucesso", "Viagem atualizada com sucesso!");
      } else {
        await addTrip(tripData as Omit<Trip, 'id'>);
        Alert.alert("Sucesso", "Viagem registrada com sucesso!");
      }
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Erro ao Salvar", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={GlobalStyles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={GlobalStyles.title}>
            {editingTrip ? 'Editar Viagem' : 'Registrar Nova Viagem'}
        </Text>

        <Input
            label="Título da Viagem"
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Minha viagem à Paris"
        />

        <Input
            label="Descrição"
            value={description}
            onChangeText={setDescription}
            placeholder="Conte sobre sua experiência..."
            multiline
            numberOfLines={4}
            style={styles.textArea}
        />

        <Input
            label="Cidade/País"
            value={cityCountry}
            onChangeText={setCityCountry}
            placeholder="Ex: Paris, França"
        />

        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
            <Input
            label="Data da Viagem"
            value={date.toLocaleDateString('pt-BR')}
            editable={false}
            />
        </TouchableOpacity>
        {showDatePicker && (
            <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (selectedDate) {
                    setDate(selectedDate);
                }
            }}
            />
        )}

        <Button title="Selecionar Imagem" onPress={pickImage} mode="outlined" style={styles.imageButton} />
        {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

        {loading ? (
            <ActivityIndicator size="large" color="#6200ee" style={styles.loadingIndicator} />
        ) : (
            <Button title={editingTrip ? "Atualizar Viagem" : "Salvar Viagem"} onPress={handleSaveTrip} />
        )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 30,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageButton: {
    marginTop: 10,
    borderColor: '#6200ee',
    borderWidth: 1,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 15,
    resizeMode: 'cover',
  },
  datePickerButton: {
    width: '100%',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});


export default TripFormScreen;