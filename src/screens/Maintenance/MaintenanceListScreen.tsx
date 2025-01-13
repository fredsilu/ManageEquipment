import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Equipment {
    id: string;
    name: string;
    lastMaintenance: string;
}

const equipmentList: Equipment[] = [
    { id: '1', name: 'Excavator', lastMaintenance: '2023-09-15' },
    { id: '2', name: 'Bulldozer', lastMaintenance: '2023-08-20' },
    { id: '3', name: 'Crane', lastMaintenance: '2023-07-10' },
];

const MaintenanceListScreen: React.FC = () => {
    const renderItem = ({ item }: { item: Equipment }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDate}>Last Maintenance: {item.lastMaintenance}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Equipment Maintenance List</Text>
            <FlatList
                data={equipmentList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDate: {
        fontSize: 14,
        color: '#666',
    },
});

export default MaintenanceListScreen;