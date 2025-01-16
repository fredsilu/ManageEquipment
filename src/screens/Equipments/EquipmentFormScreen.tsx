import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  EquipmentForm: { id: string, name: string, type: string };
};

type EquipmentFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EquipmentForm'>;
type EquipmentFormScreenRouteProp = RouteProp<RootStackParamList, 'EquipmentForm'>;

type Props = {
  navigation: EquipmentFormScreenNavigationProp;
  route: EquipmentFormScreenRouteProp;
};

const EquipmentFormScreen: React.FC<Props> = ({ navigation, route }) => {
  const { id, name, type } = route.params;
  const [equipmentName, setEquipmentName] = useState(name);
  const [equipmentType, setEquipmentType] = useState(type);

  const handleSave = () => {
    // Logic to save the updated equipment details
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Edit Equipment</Text>
      <TextInput
        style={styles.input}
        value={equipmentName}
        onChangeText={setEquipmentName}
      />
      <TextInput
        style={styles.input}
        value={equipmentType}
        onChangeText={setEquipmentType}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default EquipmentFormScreen;