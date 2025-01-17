import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import api from '../../services/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert } from 'react-native';
import { Ingredient, PlatIngredient } from '../../types/types';
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
        setPlatIngredients([...platIngredients, { ingredient_id: ingredientId, quantite: 1, plat_id: 0, unite_quantite: '' }])
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
        try {
            await api.createDish({ nom, description, prix: parseFloat(prix) });
            navigation.goBack();
        } catch (err) {
            setError("Erreur lors de l'ajout du plat.");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text>Ajouter un plat</Text>
            {error && <Text style={styles.error}>{error}</Text>}
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
                        <TextInput
                            style={styles.inputQ}
                            placeholder="Quantité"
                            keyboardType="numeric"
                            value={platIngredient.quantite.toString()}
                            onChangeText={(text) => updateIngredientQuantity(platIngredient.ingredient_id, parseFloat(text))}
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
    container: {
        flex: 1,
        padding: 16,
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
    inputI: {
        height: 60,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    inputQ: {
        height: 45,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        marginEnd: 30,
        fontSize: 15,
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
    ingredientContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
        height: 40,
        backgroundColor: '#B0C4DE', // Lighter color
    },
});

export default PlatAddScreen;