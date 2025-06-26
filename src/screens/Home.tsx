import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, RefreshControl, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import { RootStackParamList, Trip } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import GlobalStyles from '../styles/GlobalStyles';
import colors from '../styles/colors';
import { getTripsByUserId, deleteTrip } from '../services/FirestoreService';
import { auth } from '../services/firebaseConfig';
import { logoutUser } from '../services/AuthService';
import { formatDate } from '../utils/helpers';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const currentUser = auth.currentUser;

  const fetchTrips = async () => {
    if (!currentUser) return;
    try {
      const userTrips = await getTripsByUserId(currentUser.uid);
      setTrips(userTrips);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as viagens.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (currentUser) {
        fetchTrips();
      }
    }, [currentUser])
  );

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível fazer logout.");
    }
  };

  const handleDeleteTrip = async (tripId: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja excluir esta viagem?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await deleteTrip(tripId);
              setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir a viagem.");
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const renderTripItem = ({ item }: { item: Trip }) => (
    <Card style={styles.tripCard} onPress={() => navigation.navigate('TripForm', { trip: item })}>
      <Text style={styles.tripTitle}>{item.title}</Text>
    </Card>
  );

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.header}>
        <Text style={GlobalStyles.title}>Seu Mural de Viagens</Text>
        <IconButton icon="logout" size={24} onPress={handleLogout} />
      </View>
      <Button title="Registrar Nova Viagem" onPress={() => navigation.navigate('TripForm', {})} />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id}
          renderItem={renderTripItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchTrips} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tripCard: { marginBottom: 16 },
  tripTitle: { fontSize: 20, fontWeight: 'bold' },
});

export default HomeScreen;