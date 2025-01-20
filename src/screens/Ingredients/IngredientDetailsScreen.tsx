import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { RouteProp } from '@react-navigation/native';
import { ReactNode } from 'react';
import { Ingredient } from '../../types/types'



const IngredientDetailsScreen: React.FC = () => {
  const [ingredient, setIngredient] = useState<Ingredient>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  type RouteParams = {
    params: {
      ingredientId: string;
    };
  }

  const route = useRoute<RouteProp<RouteParams>>();



  useEffect(() => {
    const loadIngredient = async () => {
      try {
        const ingredientId = route.params?.ingredientId;
        const data = await api.fetchIngredientDetails(ingredientId);
        setIngredient(data);
      } catch (err) {
        setError("Erreur lors du chargement des détails de l'ingrédient.");
      } finally {
        setLoading(false);
      }
    };
    loadIngredient();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!ingredient) {
    return (
      <View style={styles.container}>
        <Text>Aucun ingredient trouvé.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {ingredient.map((data: Ingredient) => (
        <View key={data.id} style={styles.ingredientContainer}>
          <Text>Catégorie: {data.categorie}</Text>
          <Text>Nom: {data.nom_ingredient}</Text>
          <Text>Fournisseur: {data.fournisseur}</Text>
          <Text>Unité: {data.unite}</Text>
          <Text>Coût unitaire: {data.cout_unitaire}</Text>
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <Button title="Modifier" onPress={() => { /* Logique de modification */ }} />
        <Button title="Supprimer" onPress={() => { /* Logique de suppression */ }} />
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default IngredientDetailsScreen;