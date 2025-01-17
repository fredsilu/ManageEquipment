import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { NavigationProp } from '@react-navigation/native';

const DashboardScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const handleMaintenance = () => {
        // Logic for handling equipment maintenance
        console.log('Maintenance logic goes here');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
     
            <Button
                title="Go to Client List"
                onPress={() => navigation.navigate('Liste des clients')}
                color="#841584"
            />
            <View style={{ margin: 10 }} />
            <Button
                title="Go to Ingredients List"
                onPress={() => navigation.navigate('IngredientsList')}
                color="#841584"
            />
            <View style={{ margin: 10 }} />
            <Button
                title="Go to Plats List"
                onPress={() => navigation.navigate('PlatsList')}
                color="#841584"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
       
    },
});

export default DashboardScreen;