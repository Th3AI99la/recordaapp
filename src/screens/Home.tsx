import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet, Dimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import { RootStackParamList, Trip } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import GlobalStyles from '../styles/GlobalStyles';
import colors from '../styles/colors';
import { listenToTrips, deleteTrip } from '../services/FirestoreService';
import { auth } from '../services/firebaseConfig';
import { logoutUser } from '../services/AuthService';
import { formatDate } from '../utils/helpers';
import * as FileSystem from 'expo-file-system';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

type Props = StackScreenProps<RootStackParamList, 'Home'>;
const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: Props) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  // Usamos useFocusEffect para garantir que o listener seja reativado
  // se o usuário sair e entrar novamente sem fechar o app.
  useFocusEffect(
    useCallback(() => {
      if (!currentUser) {
        setLoading(false);
        setTrips([]); // Limpa as viagens se não houver usuário
        return;
      }
      
      setLoading(true);
      // Inicia o listener em tempo real
      const unsubscribe = listenToTrips(currentUser.uid, (newTrips) => {
        setTrips(newTrips);
        if (loading) {
          setLoading(false);
        }
      });

      // Função de limpeza: remove o listener quando o componente perde o foco
      return () => unsubscribe();
    }, [currentUser])
  );

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível fazer logout.");
    }
  };

  const handleDeleteTrip = async (tripToDelete: Trip) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir a viagem para "${tripToDelete.title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: 'destructive',
          onPress: async () => {
            try {
              if (tripToDelete.imageUrl && tripToDelete.imageUrl.startsWith('file://')) {
                  await FileSystem.deleteAsync(tripToDelete.imageUrl, { idempotent: true });
              }
              await deleteTrip(tripToDelete.id);
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir a viagem.");
            }
          },
        },
      ]
    );
  };

  const renderTripItem = ({ item }: { item: Trip }) => (
    <Card style={styles.tripCard} onPress={() => navigation.navigate('TripForm', { trip: item })}>
      {item.imageUrl && <Card.Cover source={{ uri: item.imageUrl }} style={styles.cardCover} />}
      <Card.Title
        title={item.title}
        titleStyle={styles.tripTitle}
        subtitle={`${item.cityCountry} - ${formatDate(item.date)}`}
        subtitleStyle={styles.tripSubtitle}
        titleNumberOfLines={2}
      />
      <Card.Content>
        <Text style={styles.tripDescription} numberOfLines={3}>{item.description}</Text>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        {/* CORREÇÃO APLICADA: Usando a prop 'title' em vez de children */}
        <Button mode="text" title="Editar" onPress={() => navigation.navigate('TripForm', { trip: item })} children={undefined} />
        <Button mode="text" title="Excluir" textColor={colors.error} onPress={() => handleDeleteTrip(item)} children={undefined} />
      </Card.Actions>
    </Card>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Nenhuma viagem registrada</Text>
        <Text style={styles.emptySubtitle}>Clique no botão abaixo para adicionar sua primeira recordação!</Text>
    </View>
  );

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.header}>
        <View>
            <Text style={GlobalStyles.title}>Recorda</Text>
            <Text style={GlobalStyles.subtitle}>Seu mural de viagens</Text>
        </View>
        <IconButton icon="logout" iconColor={colors.primary} size={28} onPress={handleLogout} />
      </View>
        <Button
        title="Registrar Nova Viagem"
        onPress={() => navigation.navigate('TripForm', {})}
        icon="plus"
        mode="contained"
        style={styles.addButton} children={undefined}        />

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id}
          renderItem={renderTripItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={renderEmptyState}
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
    },
    addButton: {
        marginBottom: 20,
        paddingVertical: 8,
        borderRadius: 30,
        backgroundColor: colors.primary,
    },
    tripCard: {
        marginBottom: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderRadius: 16,
        backgroundColor: colors.surface,
        overflow: 'hidden',
    },
    cardCover: {
        height: 180,
    },
    tripTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    tripSubtitle: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    tripDescription: {
        fontSize: 15,
        color: colors.textPrimary,
        lineHeight: 22,
        marginTop: 8,
    },
    cardActions: {
        justifyContent: 'flex-end',
        paddingHorizontal: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width * 0.3,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: 30,
    },
});

export default HomeScreen;
