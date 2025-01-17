import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import api, { Plat} from '../../services/api';
import { NavigationProp } from '@react-navigation/native';

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
                keyExtractor={(item) => item.nom}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.platContainer}
                        onPress={() => navigation.navigate('PlatDetails', { platId: item.id })}
                    >
                        <Text style={styles.platText}>Nom: {item.nom}</Text>
                        <Text style={styles.platText}>Description: {item.description}</Text>
                        <Text style={styles.platText}>Prix: {item.prix}</Text>
                     
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('PlatAdd')}
            >
                <Text style={styles.addButtonText}>Ajouter un plat</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    addButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    platContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    platText: {
        fontSize: 16,
    },
});

export default PlatsListScreen;
