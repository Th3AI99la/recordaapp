// screens/TripForm.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Image, TouchableOpacity, Platform } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import GlobalStyles from '../styles/GlobalStyles';
import colors from '../styles/colors';
import { addTrip, updateTrip } from '../services/FirestoreService';
import { uploadImage } from '../services/StorageService';
import { auth } from '../services/firebaseConfig';
import * as ImagePicker from 'expo-image-picker'; // Expo ImagePicker para selecionar imagens
import DateTimePicker from '@react-native-community/datetimepicker';

const TripForm = ({ navigation, route }) => {
  const editingTrip = route.params?.trip; // Se houver um objeto 'trip' nos parâmetros, estamos editando

  const [title, setTitle] = useState(editingTrip?.title || '');
  const [description, setDescription] = useState(editingTrip?.description || '');
  const [cityCountry, setCityCountry] = useState(editingTrip?.cityCountry || '');
  const [date, setDate] = useState(editingTrip?.date ? new Date(editingTrip.date) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageUri, setImageUri] = useState(editingTrip?.imageUrl || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: editingTrip ? 'Editar Viagem' : 'Registrar Nova Viagem',
    });
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

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSaveTrip = async () => {
    if (!title || !description || !cityCountry || !date) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    const userId = auth.currentUser?.uid;

    if (!userId) {
      Alert.alert("Erro", "Usuário não autenticado.");
      setLoading(false);
      return;
    }

    let imageUrl = editingTrip?.imageUrl || null;
    if (imageUri && imageUri !== editingTrip?.imageUrl) {
      // Somente faz upload se uma nova imagem foi selecionada
      try {
        const imagePath = `trip_images/${userId}/${Date.now()}_${title.replace(/\s/g, '_')}.jpg`;
        imageUrl = await uploadImage(imageUri, imagePath);
      } catch (error) {
        Alert.alert("Erro de Upload", "Não foi possível fazer upload da imagem.");
        console.error("Erro ao fazer upload da imagem: ", error);
        setLoading(false);
        return;
      }
    }

    const tripData = {
      title,
      description,
      cityCountry,
      date: date.toISOString(), // Armazenar como string ISO
      imageUrl,
      userId,
    };

    try {
      if (editingTrip) {
        await updateTrip(editingTrip.id, tripData);
        Alert.alert("Sucesso", "Viagem atualizada com sucesso!");
      } else {
        await addTrip(tripData);
        Alert.alert("Sucesso", "Viagem registrada com sucesso!");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro ao Salvar", error.message);
      console.error("Erro ao salvar viagem: ", error);
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
          value={date.toLocaleDateString()}
          editable={false} // Não permite edição direta, só via date picker
          pointerEvents="none" // Garante que o input não é focado
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <Button title="Selecionar Imagem" onPress={pickImage} mode="outlined" style={styles.imageButton} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator} />
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
    borderColor: colors.primary,
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

export default TripForm;
