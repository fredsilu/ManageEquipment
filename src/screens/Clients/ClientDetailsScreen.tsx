import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { RouteProp } from '@react-navigation/native';
import { Button } from 'react-native';


interface Client {
  id: string;
  nom_client: string;
  societe: string;
  telephone: string;
  email: string;
  adresse: string;
}

const ClientDetailsScreen: React.FC = () => {
  const [client, setClient] = useState<Client>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  type RouteParams = {
    params: {
      clientId: string;
    };
  };
  
  const route = useRoute<RouteProp<RouteParams>>();
  
  const handleEditClient = () => {
    // Logic to handle client edit
  };


  useEffect(() => {
    const loadClient = async () => {
      try {
        const clientId = route.params?.clientId; // Assuming clientId is passed via route params
        const datas = await api.fetchClientDetails(clientId);
        setClient(datas);
      } catch (err) {
        setError("Erreur lors du chargement des clients.");
      } finally {
        setLoading(false);
      }
    };
    loadClient();
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

  if (!client) {
    return (
      <View style={styles.container}>
        <Text>Aucun client trouvé.</Text>
      </View>
    );
  }

  return (

    <View style={styles.container}>
      {client.map((data: Client) => (
      <View key={data.id} style={styles.clientContainer}>
        <Text style={styles.clientText}>ID: {data.id}</Text>
        <Text style={styles.clientText}>Nom: {data.nom_client}</Text>
        <Text style={styles.clientText}>Société: {data.societe}</Text>
        <Text style={styles.clientText}>Téléphone: {data.telephone}</Text>
        <Text style={styles.clientText}>Email: {data.email}</Text>
        <Text style={styles.clientText}>Adresse: {data.adresse}</Text>
      </View>
      ))}

      <Button
        title="Modifier le client"
        onPress={handleEditClient}
        color="#841584"
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

export default ClientDetailsScreen;
