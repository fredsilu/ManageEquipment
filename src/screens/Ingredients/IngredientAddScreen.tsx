import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import api from '../../services/api';

import { StackNavigationProp } from '@react-navigation/stack';
type RootStackParamList = {
  IngredientAdd: undefined;
  // Add other routes here if needed
};

type IngredientAddScreenNavigationProp = StackNavigationProp<RootStackParamList, 'IngredientAdd'>;

type Props = {
  navigation: IngredientAddScreenNavigationProp;
};

const IngredientAddScreen: React.FC<Props> = ({ navigation }) => {
  const [categorie, setCategorie] = useState<string>('');
  const [nom_ingredient, setNomIngredient] = useState<string>('');
  const [fournisseur, setFournisseur] = useState<string>('');
  const [unite, setUnite] = useState<string>('');
  const [cout_unitaire, setCoutUnitaire] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleAddIngredient = async () => {
    try {
      await api.createIngredient({ categorie, nom_ingredient, fournisseur, unite, cout_unitaire: parseFloat(cout_unitaire) });
      navigation.goBack();
    } catch (err) {
      setError("Erreur lors de l'ajout de l'ingrédient.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Ajouter un ingrédient</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Catégorie"
        value={categorie}
        onChangeText={setCategorie}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom de l'ingrédient"
        value={nom_ingredient}
        onChangeText={setNomIngredient}
      />
      <TextInput
        style={styles.input}
        placeholder="Fournisseur"
        value={fournisseur}
        onChangeText={setFournisseur}
      />
      <TextInput
        style={styles.input}
        placeholder="Unité"
        value={unite}
        onChangeText={setUnite}
      />
      <TextInput
        style={styles.input}
        placeholder="Coût unitaire"
        value={cout_unitaire}
        onChangeText={setCoutUnitaire}
      />
      <Button title="Ajouter" onPress={handleAddIngredient} />
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

export default IngredientAddScreen;