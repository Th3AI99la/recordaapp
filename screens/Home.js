// screens/Home.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import Card from '../components/Card';
import Button from '../components/Button';
import GlobalStyles from '../styles/GlobalStyles';
import colors from '../styles/colors';
import { getTripsByUserId, deleteTrip } from '../services/FirestoreService';
import { auth } from '../services/firebaseConfig';
import { logoutUser } from '../services/AuthService';
import { formatDate } from '../utils/helpers';

const Home = ({ navigation }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const currentUser = auth.currentUser;

  const fetchTrips = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }
    try {
      const userTrips = await getTripsByUserId(currentUser.uid);
      setTrips(userTrips);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as viagens.");
      console.error("Erro ao carregar viagens: ", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Use useFocusEffect para recarregar as viagens sempre que a tela Home for focada
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchTrips();
    }, [currentUser])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTrips();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigation.replace('Login'); // Redireciona para a tela de Login
    } catch (error) {
      Alert.alert("Erro", "Não foi possível fazer logout.");
      console.error("Erro ao fazer logout: ", error);
    }
  };

  const handleDeleteTrip = async (tripId) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir esta viagem?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            setLoading(true);
            try {
              await deleteTrip(tripId);
              Alert.alert("Sucesso", "Viagem excluída com sucesso!");
              fetchTrips(); // Recarrega a lista de viagens
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir a viagem.");
              console.error("Erro ao excluir viagem: ", error);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const renderTripItem = ({ item }) => (
    <Card style={styles.tripCard} onPress={() => navigation.navigate('TripForm', { trip: item })}>
      <View style={styles.cardHeader}>
        <Text style={styles.tripTitle}>{item.title}</Text>
        <View style={styles.actionButtons}>
          <IconButton
            icon="pencil"
            color={colors.secondary}
            size={20}
            onPress={() => navigation.navigate('TripForm', { trip: item })}
          />
          <IconButton
            icon="delete"
            color={colors.error}
            size={20}
            onPress={() => handleDeleteTrip(item.id)}
          />
        </View>
      </View>
      <Text style={styles.tripLocation}>{item.cityCountry}</Text>
      <Text style={styles.tripDate}>{formatDate(item.date)}</Text>
      {item.imageUrl && <Card.Cover source={{ uri: item.imageUrl }} style={styles.tripImage} />}
      <Text style={styles.tripDescription} numberOfLines={2}>{item.description}</Text>
    </Card>
  );

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.header}>
        <Text style={GlobalStyles.title}>Seu Mural de Viagens</Text>
        <IconButton icon="logout" color={colors.textSecondary} size={24} onPress={handleLogout} />
      </View>

      <Button title="Registrar Nova Viagem" onPress={() => navigation.navigate('TripForm')} />

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator} />
      ) : trips.length === 0 ? (
        <Text style={styles.noTripsText}>Nenhuma viagem registrada ainda. Que tal adicionar uma?</Text>
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id}
          renderItem={renderTripItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tripCard: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
    flexShrink: 1, // Permite que o texto quebre linha
  },
  actionButtons: {
    flexDirection: 'row',
  },
  tripLocation: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  tripDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  tripImage: {
    height: 150,
    marginBottom: 8,
    borderRadius: 4,
  },
  tripDescription: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  loadingIndicator: {
    marginTop: 50,
  },
  noTripsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: colors.textSecondary,
  },
  listContent: {
    paddingBottom: 20, // Espaçamento inferior para a lista
  },
});

export default Home;
