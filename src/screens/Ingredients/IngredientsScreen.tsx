import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import { Ingredient } from '../../types/types';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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
              onPress={() => navigation.navigate('DetailsIngredient', { ingredientId: item.id })}
                    >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                     
                      <View>
                      <Text style={styles.ingredientNameText}>Nom: {item.nom_ingredient}</Text>
                      <Text style={styles.ingredientText}>id: {item.id}</Text>
                        <Text style={styles.ingredientText}>Société: {item.fournisseur}</Text>
                      <Text style={styles.ingredientCoutText}>Téléphone: {item.cout_unitaire}</Text>
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
  },
  ingredientContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  ingredientNameText: {
    fontSize: 20,
    color: 'blue',
    fontWeight: 'bold',
  },
  ingredientText: {
    fontSize: 14,
  },
  ingredientCoutText: {
    fontSize: 15,
    color: '#3BB700',
    fontWeight: 'bold',
  },
});

export default IngredientsListScreen;