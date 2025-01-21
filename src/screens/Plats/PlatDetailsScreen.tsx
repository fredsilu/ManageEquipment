import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import api from '../../services/api';
import {Ingredient, PlatIngredient,Plat} from '../../types/types';

type RouteParams = {
  params: {
    platId: string;
  };
};

const PlatDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams>>();
  const [plat, setPlat] = useState<Plat | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [platIngredients, setPlatIngredients] = useState<PlatIngredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlatDetails = async () => {
      try {
        const platData = await api.fetchPlatDetails(route.params.platId);
        const ingredientsData = await api.fetchIngredients();
        const platIngredientsData = await api.fetchPlatIngredients(route.params.platId);
        setPlat(platData);
        setIngredients(ingredientsData);
        setPlatIngredients(platIngredientsData);
      } catch (err) {
        setError("Erreur lors du chargement des détails du plat.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlatDetails();
  }, [route.params.platId]);

  const handleUpdatePlat = async () => {
    try {
      if (plat) {
        await api.updatePlat(plat);
      } else {
        alert("Plat non trouvé");
      }
      alert("Plat mis à jour avec succès");
    } catch (err) {
      alert("Erreur lors de la mise à jour du plat");
    }
  };

  const handleDeleteIngredient = async (ingredientId: string) => {
    try {
      await api.deletePlatIngredient(route.params.platId, ingredientId);
      setPlatIngredients(platIngredients.filter(pi => pi.ingredient_id !== ingredientId));
      alert("Ingrédient supprimé avec succès");
    } catch (err) {
      alert("Erreur lors de la suppression de l'ingrédient");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
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
      {plat && plat.map((platData: Plat) => (
        <>
          <Text>Nom:</Text>
          <TextInput
            style={styles.input}
            value={platData.nom}
            onChangeText={(text) => setPlat({ ...platData, nom: text })}
          />
          <Text>Description:</Text>
          <TextInput
            style={styles.input}
            value={platData.description}
            onChangeText={(text) => setPlat({ ...platData, description: text })}
          />
          <Button title="Mettre à jour" onPress={handleUpdatePlat} />
        </>
      ))}
      <Text>Ingrédients:</Text>
      <FlatList
        data={platIngredients}
        keyExtractor={(item) => item.ingredient_id.toString()}
        renderItem={({ item }) => {
          const ingredient = ingredients.find(ing => ing.id === item.ingredient_id);
          return (
            <View style={styles.ingredientContainer}>
              <Text>{ingredient?.nom_ingredient}</Text>
              <Text>Quantité: {item.quantite} {item.unite_quantite}</Text>
              <Button title="Supprimer" onPress={() => handleDeleteIngredient(item.ingredient_id)} />
            </View>
          );
        }}
      />
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
  ingredientContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default PlatDetailsScreen;