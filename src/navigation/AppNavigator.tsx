import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import EquipmentListScreen from '../screens/Equipments/EquipmentListScreen';
import MaintenanceListScreen from '../screens/Maintenance/MaintenanceListScreen';
import EquipmentDetailsScreen from '../screens/Equipments/EquipmentDetailsScreen';
import TeamListScreen from '../screens/Teams/TeamListScreen';
import DashboardScreen from '../screens/Reports/DashboardScreen';
import EquipmentFormScreen from '../screens/Equipments/EquipmentFormScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const EquipmentStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Liste des équipments" component={EquipmentListScreen} />
    <Stack.Screen name="EquipmentDetails" component={EquipmentDetailsScreen} />
    <Stack.Screen name="EquipmentForm" component={EquipmentFormScreen} />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Equipment" component={EquipmentStack} />
      <Tab.Screen name="Maintenance" component={MaintenanceListScreen} />
      <Tab.Screen name="Teams" component={TeamListScreen} />
      <Tab.Screen name="Reports" component={DashboardScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;