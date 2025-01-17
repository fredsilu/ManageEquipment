import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

import { NavigationProp } from '@react-navigation/native';

const DashboardScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const handleMaintenance = () => {
        // Logic for handling equipment maintenance
        console.log('Maintenance logic goes here');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Liste des clients')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Go to Client List</Text>
                    <View style={styles.buttonIcon}>
                        <Text style={styles.buttonText}>→</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('IngredientsList')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Go to Ingredient List</Text>
                    <View style={styles.buttonIcon}>
                        <Text style={styles.buttonText}>→</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('PlatList')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Go to Plat List</Text>
                    <View style={styles.buttonIcon}>
                        <Text style={styles.buttonText}>→</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        marginVertical: 10,
        width: '80%',
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: 'linear-gradient(90deg, rgba(132,21,132,1) 0%, rgba(255,0,150,1) 100%)',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    buttonIcon: {
        marginLeft: 10,
    },
});

export default DashboardScreen;