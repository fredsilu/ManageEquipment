import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRoute, RouteProp, NavigationProp, useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { Plat, PlatIngredient } from '../../types/types';
import Picker from 'react-native-picker-select';

const PlatModifScreen: React.FC = () => {
    const [plat, setPlat] = useState<Plat>(); // le plat à modifier
    const [platIngredients, setPlatIngredients] = useState<PlatIngredient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    type RouteParams = {
        params: {
            plat_Id: string;
        };
    }
    const route = useRoute<RouteProp<RouteParams>>();
    const navigation = useNavigation();

    useEffect(() => {
        const loadPlat = async () => {
            if (route.params?.plat_Id) { // Vérifier si platId existe
                try {
                    const plat_Id = route.params?.plat_Id;
                    console.log("platId", plat_Id );
                    const data = await api.fetchDishDetails(plat_Id);
                    setPlat(data);

                } catch (err) {
                    setError("Erreur lors du chargement des détails du plat.");
                } finally {
                    setLoading(false);
                }
            }
        };
        loadPlat();
        // Mise à jour lorsque route.params change
        const unsubscribe = navigation.addListener('focus', () => {loadPlat();
        });
        return () => unsubscribe();
    }, [route.params]);
    /*
        // pour ajouter un ingrédient à ce plat
            const addIngredientToPlat = (ingredientId: number) => {
                const ingredientExists = (ingredientsPlat ?? []).find(item => item.id === ingredientId)
                if (ingredientExists) {
                    Alert.alert("Erreur", "Cet ingrédient a déjà été ajouté.")
                    return;
                }
                setPlatIngredients([...platIngredients, { ingredient_id: ingredientId, quantite: 1, plat_id: 0, unite_quantite: ingredients.find(ing => ing.id === ingredientId)?.unite || '' }]);
            }*/




    return (

        <View>
            <Text>Hello, world!</Text>

        </View>
    );



}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    ingredientContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
        height: 40,
        backgroundColor: '#B0C4DE',
    },
    inputI: {
        flex: 3,
        height: 60,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    inputQ: {
        flex: 1,
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


export default PlatModifScreen;
