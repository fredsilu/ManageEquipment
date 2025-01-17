import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import api  from '../../services/api';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Plat } from '../../types/types';

interface Props {
    navigation: NavigationProp<any>;
}

const PlatsListScreen: React.FC<Props> = ({ navigation }) => {
    const [plats, setPlats] = useState<Plat[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPlats = async () => {
            try {
                const data = await api.fetchDishes();
                setPlats(data);
            } catch (err) {
                setError("Erreur lors du chargement des plats.");
            } finally {
                setLoading(false);
            }
        };

        loadPlats();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            title: 'Liste des Plats',
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('AjouterPlat')}>
                        <Ionicons name="add" size={25} color="#000" style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        /* Logic for search functionality */}}>
                        <Ionicons name="search" size={25} color="#000" style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={plats}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                        <TouchableOpacity
                        style={styles.platContainer}
                        onPress={() => navigation.navigate('PlatDetailsScreen', { platId: item.id })}
                        >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                            source={{ uri: item.photoUrl }}
                            style={styles.platImage}
                            />
                            <View>
                            <Text style={styles.platName}>{item.nom}</Text>
                            <Text style={styles.platText}>Réf: {item.id}</Text>
                            <Text style={styles.platText}>{item.description}</Text>
                            <Text style={styles.platPrixText}>{item.prix} $</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                )}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AjouterPlat')}>
                <Text style={styles.addButtonText}>Ajouter un Plat</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#e0f7fa',
    },
    platContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    platPrixText   : {
        fontSize: 18,
        color: '#3BB700',
        fontWeight: 'bold',
    },
    platText: {
        fontSize: 14,
        color: '#004d40',
    },
    platName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00251a',
    },
    platImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    phoneIcon: {
        marginRight: 8,
    },
    addButton: {
        backgroundColor: '#d32f2f',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default PlatsListScreen;
