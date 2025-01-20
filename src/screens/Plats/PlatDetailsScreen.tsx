import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { RouteProp } from '@react-navigation/native';
import { Plat } from '../../types/types';

const PlatDetailsScreen: React.FC = () => {
    const [plat, setPlat] = useState<Plat>();
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
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Modifier</Text>
                </View>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Supprimer</Text>
                </View>
            </View>
        </View>
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
