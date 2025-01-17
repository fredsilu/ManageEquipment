import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { RouteProp } from '@react-navigation/native';
import { ReactNode } from 'react';



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
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  clientContainer: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    transform: [{ perspective: 1000 }],
  },
  clientText: {
    fontSize: 16,
    color: '#333',
  },
});



const AnimatedClientContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  const animatedValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.clientContainer, { transform: [{ scale: animatedValue }] }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export { styles, AnimatedClientContainer };

export default ClientDetailsScreen;
