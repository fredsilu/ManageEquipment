import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { apiClient, Client } from '../../services/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  ClientList: undefined;
  ClientDetails: { clientId: string };
};

type ClientListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClientList'>;

type Props = {
  navigation: ClientListScreenNavigationProp;
};

const ClientListScreen: React.FC<Props> = ({ navigation }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await apiClient.fetchClients();
        setClients(data);
      } catch (err) {
        setError("Erreur lors du chargement des clients.");
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={clients}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.clientContainer}
            onPress={() => navigation.navigate('ClientDetails', { clientId: item.id })}
          >
            <Text style={styles.clientText}>Nom: {item.nom_client}</Text>
            <Text style={styles.clientText}>Société: {item.societe}</Text>
            <Text style={styles.clientText}>Téléphone: {item.telephone}</Text>
            <Text style={styles.clientText}>Email: {item.email}</Text>
            <Text style={styles.clientText}>Adresse: {item.adresse}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  clientContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  clientText: {
    fontSize: 16,
  },
});

export default ClientListScreen;