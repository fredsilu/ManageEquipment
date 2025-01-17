import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import api from '../../services/api';

import { StackNavigationProp } from '@react-navigation/stack';
import { Alert } from 'react-native';
type RootStackParamList = {
    PlatAdd: undefined;
    // Add other routes here if needed
};

type PlatAddScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PlatAdd'>;

type Props = {
    navigation: PlatAddScreenNavigationProp;

};

interface Ingredient {
    id: string;
    categorie: string;
    nom_ingredient: string;
    fournisseur: string;
    unite: string;
    cout_unitaire: number;
}

interface Plat {
    id: string;
    nom: string;
    description: string;
    ingredients: { id: number; quantite: number }[];
    prix: number;
}


const PlatAddScreen: React.FC<Props> = ({ navigation }) => {

    const [nom, setNom] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [prix, setPrix] = useState<string>('');
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [platIngredients, setPlatIngredients] = useState<{ id: number; quantite: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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


    const addIngredientToPlat = (ingredientId: number) => {
        const ingredientExists = platIngredients.find(item => item.id === ingredientId)
        if(ingredientExists){
            Alert.alert("Erreur", "Cet ingrédient a déjà été ajouté.")
            return;
        }
        setPlatIngredients([...platIngredients, {id: ingredientId, quantite: 1}])
    }
    const updateIngredientQuantity = (ingredientId: number, quantity: number) => {
        setPlatIngredients(
            platIngredients.map((item) =>
                item.id === ingredientId ? { ...item, quantite: quantity } : item
            )
        );
    };
    
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

export default PlatAddScreen;