import  { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import api, { Ingredient } from '../../services/api';
import {  NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

const IngredientsListScreen: React.FC<Props> = ({ navigation }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const data = await api.fetchIngredients();
        setIngredients(data);
      } catch (err) {
        setError("Erreur lors du chargement des ingrédients.");
      } finally {
        setLoading(false);
      }
    };

    loadIngredients();
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
        data={ingredients}
        keyExtractor={(item) => item.nom_ingredient}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.ingredientContainer}
            onPress={() => navigation.navigate('IngredientDetails', { ingredientId: item.id })}
          >
            <Text style={styles.ingredientText}>Catégorie: {item.categorie}</Text>
            <Text style={styles.ingredientText}>Nom: {item.nom_ingredient}</Text>
            <Text style={styles.ingredientText}>Fournisseur: {item.fournisseur}</Text>
            <Text style={styles.ingredientText}>Unité: {item.unite}</Text>
            <Text style={styles.ingredientText}>Coût unitaire: {item.cout_unitaire}</Text>
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
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  ingredientContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  ingredientText: {
    fontSize: 16,
  },
  

});

export default IngredientsListScreen;