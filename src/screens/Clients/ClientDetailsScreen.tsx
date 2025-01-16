import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { apiClient, Client } from '../../services/api';
import { StackScreenProps } from '@react-navigation/stack';

import { ParamListBase } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

type ClientDetailsScreenRouteProp = RouteProp<ParamListBase, 'ClientDetails'>;

type ClientDetailsScreenProps = {
  route: ClientDetailsScreenRouteProp;
};


const ClientDetailsScreen: React.FC<ClientDetailsScreenProps> = ({ route }) => {
  const { clientId } = route.params as { clientId: string };
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClient = async () => {
      try {
        const data = await apiClient.fetchClientDetails(clientId);
        setClient(data);
      } catch (err) {
        setError("Erreur lors du chargement des détails du client.");
      } finally {
        setLoading(false);
      }
    };

    loadClient();
  }, [clientId]);

  if (loading) {
    return <Text>Chargement...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {client && (
        <>
          <Text>Nom: {client.nom_client}</Text>
          <Text>Société: {client.societe}</Text>
          <Text>Téléphone: {client.telephone}</Text>
          <Text>Email: {client.email}</Text>
          <Text>Adresse: {client.adresse}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ClientDetailsScreen;