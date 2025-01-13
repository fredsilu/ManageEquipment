import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const teams = [
    { id: '1', name: 'Team A' },
    { id: '2', name: 'Team B' },
    { id: '3', name: 'Team C' },
    // Ajoutez plus d'équipes ici
];

const TeamListScreen = () => {
    const renderItem = ({ item }: { item: { id: string; name: string } }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={teams}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        borderRadius: 5,
    },
    title: {
        fontSize: 24,
    },
});

export default TeamListScreen;