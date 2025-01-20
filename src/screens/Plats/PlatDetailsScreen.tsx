import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, NavigationProp } from '@react-navigation/native';
import api from '../../services/api';
import { RouteProp } from '@react-navigation/native';
import { Plat, Ingredient } from '../../types/types';
import { ScrollView } from 'react-native';


interface Props {
    navigation: NavigationProp<any>;
}

const PlatDetailsScreen: React.FC<Props> = ({ navigation }) => {
    const [plat, setPlat] = useState<Plat>();
    const [ingredients, setIngredients] = useState<any[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    type RouteParams = {
        params: {
            platId: string;
        };
    };

    const route = useRoute<RouteProp<RouteParams>>();

    useEffect(() => {
        const loadPlat = async () => {
            try {
                const platId = route.params?.platId;
                const data = await api.fetchDishDetails(platId);
                setPlat(data);

                //recupère les détails du plat
                const ingredientsData = await api.fetchPlatIngredients(platId);
                setIngredients(ingredientsData); //recupère les ingrédients du plat
            } catch (err) {
                setError("Erreur lors du chargement des détails du plat.");
            } finally {
                setLoading(false);
            }
        };
        loadPlat();
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

    if (!plat) {
        return (
            <View style={styles.container}>
                <Text>Aucun plat trouvé.</Text>
            </View>
        );
    }

    return (

        <View style={styles.container}>
            {plat.map((data: Plat) => (
                <View key={data.id} style={styles.platContainer}>
                    <Text>Nom: {data.nom}</Text>
                    <Text>Description: {data.description}</Text>
                    <Text>Prix: {data.prix}</Text>
                </View>
            ))}

            <Text>Les ingrédients du plat:</Text>
            <ScrollView>
                {ingredients && ingredients.map((dataI: any) => (
                    <View key={dataI.id} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{dataI.categorie}</Text>
                        <Text style={styles.tableCell}>{dataI.nom_ingredient}</Text>
                        <Text style={styles.tableCell}>{dataI.cout_unitaire}</Text>
                        <Text style={styles.tableCell}>{dataI.unite_quantite}</Text>
                        <Text style={styles.tableCell}>{dataI.quantite}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.buttonContainer}>
                {plat.map((dataP: Plat) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ModifPlat', dataP.id)}
                    >
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Modifier</Text>
                        </View>
                    </TouchableOpacity>

                ))}
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Supprimer</Text>
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    platContainer: {
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
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        marginVertical: 4,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 2,
    },
    tableCell: {
        flex: 1,
        padding: 8,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    button: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PlatDetailsScreen;
