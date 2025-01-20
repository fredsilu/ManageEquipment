import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import api from '../../services/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert } from 'react-native';
import { Ingredient, PlatIngredient } from '../../types/types';
import { MaterialIcons } from '@expo/vector-icons';
//import { Picker } from '@react-native-picker/picker';
import Picker from 'react-native-picker-select';


type RootStackParamList = {
    PlatAdd: undefined;
    // Add other routes here if needed
};

type PlatAddScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PlatAdd'>;

type Props = {
    navigation: PlatAddScreenNavigationProp;
};

const PlatAddScreen: React.FC<Props> = ({ navigation }) => {

    const [nom, setNom] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [prix, setPrix] = useState<string>('');
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [platIngredients, setPlatIngredients] = useState<PlatIngredient[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const data = await api.fetchIngredients(); // Votre appel API pour récupérer les ingrédients
                setIngredients(data);
            } catch (err) {
                console.error("Erreur lors de la récupération des ingrédients :", err);
                setError("Erreur lors du chargement des ingrédients.");
            } finally {
                setLoading(false);
            }
        };

        fetchIngredients();
    }, []);

    // pour ajouter un ingrédient à ce plat
    const addIngredientToPlat = (ingredientId: number) => {
        const ingredientExists = platIngredients.find(item => item.ingredient_id === ingredientId)
        if (ingredientExists) {
            Alert.alert("Erreur", "Cet ingrédient a déjà été ajouté.")
            return;
        }
        setPlatIngredients([...platIngredients, { ingredient_id: ingredientId, quantite: 1, plat_id: 0, unite_quantite: ingredients.find(ing => ing.id === ingredientId)?.unite || '' }]);
    }

    const updateIngredientQuantity = (ingredientId: number, quantity: number) => {
        setPlatIngredients(
            platIngredients.map((item) =>
                item.ingredient_id === ingredientId ? { ...item, quantite: quantity } : item
            )
        );
    };

    const updatePlatPrix = () => {
        const totalPrix = platIngredients.reduce((total, platIngredient) => {
            const ingredient = ingredients.find(ing => ing.id === platIngredient.ingredient_id);
            if (ingredient) {
                return total + (platIngredient.quantite * ingredient.cout_unitaire);
            }
            return total;
        }, 0);
        setPrix(totalPrix.toFixed(2).toString());
    };

    useEffect(() => {
        updatePlatPrix();
    }, [platIngredients]);

    const handleAddPlat = async () => {
        if (!nom.trim()) {
            setError("Le nom du plat ne peut pas être vide.");
            return;
        }

        if (platIngredients.length === 0) {
            setError("Le plat doit contenir au moins un ingrédient.");
            return;
        }

        const platIngredientsValues = platIngredients.map(item => ({
            ingredientId: item.ingredient_id,
            quantite: item.quantite,
            unite: item.unite_quantite
        }));
        
        const platData = {
            nom,
            description,
            prix: parseFloat(prix),
            platIngredients: platIngredientsValues,
        };
        console.log(platData);

        try {
            await api.createDish(platData);
            navigation.goBack();
        } catch (err) {
            setError("Erreur lors de l'ajout du plat.");
        }

    };

    return (
        <ScrollView style={styles.container}>
            <Text>Ajouter un plat</Text>
            <Text style={styles.error}>{error}</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom"
                value={nom}
                onChangeText={setNom}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <Picker
                items={ingredients.map((ingredient) => ({
                    label: ingredient.nom_ingredient,
                    value: ingredient.id
                }))}
                value={null}
                onValueChange={(itemValue) => {
                    if (itemValue !== null) {
                        addIngredientToPlat(itemValue as number);
                    }
                }}
            />

            {platIngredients.map((platIngredient) => {
                const ingredient = ingredients.find(ing => ing.id === platIngredient.ingredient_id);
                return (
                    <View key={platIngredient.ingredient_id} style={styles.ingredientContainer}>
                        <Text style={styles.inputI}>{ingredient?.nom_ingredient}</Text>
                        <Text style={styles.inputI}>({ingredient?.unite})</Text>
                        <TextInput
                            style={styles.inputQ}
                            placeholder="Quantité"
                            keyboardType="numeric"
                            value={platIngredient.quantite.toString()}
                            onChangeText={(text) => updateIngredientQuantity(platIngredient.ingredient_id, parseFloat(text))}
                        />
                        <MaterialIcons
                            name="delete"
                            size={24}
                            color="grey"
                            onPress={() => {
                                setPlatIngredients(platIngredients.filter(item => item.ingredient_id !== platIngredient.ingredient_id));
                            }}
                        />
                    </View>
                );
            })}
            <Text style={styles.inputT}>Prix total : {prix} $</Text>

            <View style={styles.buttonContainer}>
                <Button title="Ajouter" onPress={handleAddPlat} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { //le scrollview
        flex: 1,
        padding: 16,
    },
    ingredientContainer: {  // le container de chaque ingredient : nom - quantite - bouton delete
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
        height: 40,
        backgroundColor: '#B0C4DE', // Lighter color
    },
    inputI: {  // le style pour le nom de l'ingredient
        flex : 3,
        height: 60,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    inputQ: {  //le style pour la quantité de l'ingrédient
        flex : 1,
        height: 45,
        paddingHorizontal: 8,
        fontSize: 15,
        alignContent: 'flex-end',
    },
    
    buttonContainer: {
        marginBottom: 50,
    },
    picker: {
        width: '100%',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
   
   
    inputT: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 50,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    error: {
        color: 'red',
        marginBottom: 12,
    },
   
});

export default PlatAddScreen;