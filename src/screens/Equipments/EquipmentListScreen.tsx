import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const EquipmentListScreen: React.FC = ({ navigation }) => {
  const equipments = [
    { id: '1', name: 'Pump A', type: 'Hydraulic' },
    { id: '2', name: 'Generator B', type: 'Electrical' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={equipments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Button
              title="View Details"
              onPress={() => navigation.navigate('EquipmentDetails', { id: item.id })}
            />
          </View>
        )}
      />
      <Button title="Add Equipment" onPress={() => navigation.navigate('EquipmentForm')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EquipmentListScreen;
