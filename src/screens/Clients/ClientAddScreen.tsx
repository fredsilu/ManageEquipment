import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../../services/api';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  ClientAdd: undefined;
};

type ClientAddScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClientAdd'>;

type Props = {
  navigation: ClientAddScreenNavigationProp;
};

const ClientAddScreen: React.FC<Props> = ({ navigation }) => {
  const [nom_client, setNomClient] = useState<string>('');
  const [societe, setSociete] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [adresse, setAdresse] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleAddClient = async () => {
    if (!nom_client.trim()) {
      setError("Le nom du client est requis.");
      return;
    }
    try {
      await api.createClient({ nom_client, societe, telephone, email, adresse });
      // Optionnel: Afficher une alerte
      Alert.alert("Succès", "Utilisateur ajouté avec succès !");
      navigation.goBack();
    } catch (err) {
      setError("Erreur lors de l'ajout du client.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Ajouter un client</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Nom du client"
        value={nom_client}
        onChangeText={setNomClient}
      />
      <TextInput
        style={styles.input}
        placeholder="Société"
        value={societe}
        onChangeText={setSociete}
      />
      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        value={telephone}
        onChangeText={setTelephone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={adresse}
        onChangeText={setAdresse}
      />
      <Button title="Ajouter" onPress={handleAddClient} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 60,
    borderColor: '#007BFF',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ClientAddScreen;