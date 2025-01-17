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
            <Button title="Perform Maintenance" onPress={handleMaintenance} />
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
});

export default DashboardScreen;