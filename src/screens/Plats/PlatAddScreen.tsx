import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import api from '../../services/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert } from 'react-native';
import { Ingredient, PlatIngredient } from '../../types/types';


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
        <View style={styles.container}>
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

            <Text>Ingrédients</Text>
            <View style={styles.ingredientContainer}>
                <Text>Ingrédient</Text>
                <Text>Quantité</Text>
                {platIngredients.map((platIngredient) => (
                    <View key={platIngredient.ingredient_id} style={styles.ingredientContainer}>
                        <Text>
                            {ingredients.find((ing) => ing.id === platIngredient.ingredient_id)?.nom_ingredient}
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Quantité"
                            keyboardType="numeric"
                            value={platIngredient.quantite.toString()}
                            onChangeText={(text) => updateIngredientQuantity(platIngredient.ingredient_id, parseInt(text))}
                        />
                    </View>
                ))}
            </View>


            <TextInput
                style={styles.input}
                placeholder="Coût unitaire"
                value={prix}
                onChangeText={setPrix}
            />
            <Button title="Ajouter" onPress={handleAddPlat} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    picker: {
        height: 60,
        width: '100%',
    },
    input: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
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
        marginBottom: 10,
        height: 150,
        backgroundColor: 'blue',
    },
});

export default PlatAddScreen;