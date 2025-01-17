import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api, { Ingredient } from '../../services/api';

import { RouteProp } from '@react-navigation/native';

type IngredientDetailsScreenProps = {
  route: RouteProp<{ params: { ingredientId: string } }, 'params'>;
};

const IngredientDetailsScreen: React.FC<IngredientDetailsScreenProps> = ({ route }) => {
  const { ingredientId } = route.params;
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIngredient = async () => {
      try {
        const data = await api.fetchIngredientDetails(ingredientId);
        setIngredient(data);
      } catch (err) {
        setError("Erreur lors du chargement des détails de l'ingrédient.");
      } finally {
        setLoading(false);
      }
    };

    loadIngredient();
  }, [ingredientId]);

  if (loading) {
    return <Text>Chargement...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {ingredient && (
        <>
          <Text>Catégorie: {ingredient.categorie}</Text>
          <Text>Nom: {ingredient.nom_ingredient}</Text>
          <Text>Fournisseur: {ingredient.fournisseur}</Text>
          <Text>Unité: {ingredient.unite}</Text>
          <Text>Coût unitaire: {ingredient.cout_unitaire}</Text>
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

export default IngredientDetailsScreen;