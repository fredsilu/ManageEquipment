import React, { useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ingredients = ['Tomate', 'Oignon', 'Carotte', 'Poivron'];

const MyComponent = () => {
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);

  const handleIngredientSelection = (ingredient: string) => {
    setSelectedIngredient(ingredient);
  };

  const handleAddIngredient = () => {
    setIngredientsList([...ingredientsList, selectedIngredient]);
    setSelectedIngredient('');
  };

  const renderItem = ({ item }: { item: string }) => (
    <Text style={{ padding: 10 }} onPress={() => handleIngredientSelection(item)}>{item}</Text>
  );

  return (
    <View>
      <Picker
        selectedValue={selectedIngredient}
        onValueChange={(itemValue: string) => handleIngredientSelection(itemValue)}
      >
        {ingredients.map((ingredient) => (
          <Picker.Item key={ingredient} label={ingredient} value={ingredient} />
        ))}
      </Picker>

      <Text>Ingrédient sélectionné : {selectedIngredient}</Text>
      <Button title="Ajouter à la liste" onPress={handleAddIngredient} disabled={!selectedIngredient} />
      <Text>Liste des ingrédients :</Text>
      <FlatList
        data={ingredientsList}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default MyComponent;