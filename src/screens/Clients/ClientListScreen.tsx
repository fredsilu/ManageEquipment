import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import api, { Client } from '../../services/api';
import { NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


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

  


  useEffect(() => {
    navigation.setOptions({
      title: 'Liste des Clients',
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('ClientAdd')}>
            <Icon name="add" size={25} color="#000" style={{ marginRight: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            
            /* Logic for search functionality */}}>
            <Icon name="search" size={25} color="#000" style={{ marginRight: 15 }} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
              source={{ uri: item.photoUrl }}
              style={styles.clientImage}
              />
              <View>
              <Text style={styles.clientName}>Nom: {item.nom_client}</Text>
              <Text style={styles.clientText}>id: {item.id}</Text>
              <Text style={styles.clientText}>Société: {item.societe}</Text>
              <Text style={styles.clientText}>Téléphone: {item.telephone}</Text>
              </View>
            </View>
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
    backgroundColor: '#e0f7fa',
  },
  clientContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  clientText: {
    fontSize: 14,
    color: '#004d40',
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00251a',
  },
  clientSociete: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003d33',
  },
  clientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneIcon: {
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#d32f2f',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ClientListScreen;