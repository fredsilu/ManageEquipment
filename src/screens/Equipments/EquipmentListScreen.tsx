import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  EquipmentList: undefined;
  EquipmentDetails: { id: string };
  EquipmentForm: undefined;
};

type EquipmentListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EquipmentList'
>;

type Props = {
  navigation: EquipmentListScreenNavigationProp;
};

const EquipmentListScreen: React.FC<Props> = ({ navigation }) => {
  const equipments = [
    { id: '1', name: 'Pump A', type: 'Hydraulic' },
    { id: '2', name: 'Generator B', type: 'Electrical' },
    { id: '3', name: 'Compressor C', type: 'Pneumatic' },
    { id: '4', name: 'Valve D', type: 'Hydraulic' },
    { id: '5', name: 'Motor E', type: 'Electrical' },
    { id: '6', name: 'Conveyor F', type: 'Mechanical' },
    { id: '7', name: 'Sensor G', type: 'Electronic' },
    { id: '8', name: 'Boiler H', type: 'Thermal' },
    { id: '9', name: 'Fan I', type: 'Mechanical' },
    { id: '10', name: 'Switch J', type: 'Electrical' },
    { id: '11', name: 'Transformer K', type: 'Electrical' },
    { id: '12', name: 'Filter L', type: 'Hydraulic' }
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
