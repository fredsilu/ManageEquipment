import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import api, { Client } from '../../services/api';
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

const ClientListScreen: React.FC<Props> = ({ navigation }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await api.fetchClients();
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
            onPress={() => navigation.navigate('ClientDetailsScreen', { clientId: item.id })}
          >
            <Text style={styles.clientText}>Nom: {item.nom_client}</Text>
            <Text style={styles.clientText}>Société: {item.societe}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ClientAdd')}
      >
        <Text style={styles.addButtonText}>Ajouter un client</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  clientContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  clientText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ClientListScreen;