import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { apiClient } from '../../services/api';

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
    try {
      await apiClient.createClient({ nom_client, societe, telephone, email, adresse });
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default ClientAddScreen;