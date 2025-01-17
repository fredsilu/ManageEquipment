import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaintenanceListScreen from '../screens/Maintenance/MaintenanceListScreen';
import EquipmentDetailsScreen from '../screens/Equipments/EquipmentDetailsScreen';
import TeamListScreen from '../screens/Teams/TeamListScreen';
import DashboardScreen from '../screens/Reports/DashboardScreen';
import EquipmentAddScreen from '../screens/Equipments/EquipmentAddScreen';
import ClientListScreen from '../screens/Clients/ClientListScreen';
import EquipmentListScreen from '../screens/Equipments/EquipmentListScreen';
import ClientAddScreen from '../screens/Clients/ClientAddScreen';
import IngredientsListScreen from '../screens/Ingredients/IngredientsListScreen';
import IngredientAddScreen from '../screens/Ingredients/IngredientAddScreen';
import ClientDetailsScreen from '../screens/Clients/ClientDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ClientStack = () => (
  <Stack.Navigator>
   
   <Stack.Screen name="Tableau de bord" component={DashboardScreen} />
    <Stack.Screen name="Liste des clients" component={ClientListScreen} />
    <Stack.Screen name="ClientDetailsScreen" component={ClientDetailsScreen} />
    <Stack.Screen name="Liste des équipements" component={EquipmentListScreen} />
    <Stack.Screen name="EquipmentDetails" component={EquipmentDetailsScreen} />
    <Stack.Screen name="EquipmentAdd" component={EquipmentAddScreen} />
    <Stack.Screen name="ClientAdd" component={ClientAddScreen} />
    <Stack.Screen name="IngredientsList" component={IngredientsListScreen} />
    <Stack.Screen name="IngredientAdd" component={IngredientAddScreen} />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Client" component={ClientStack} />
      <Tab.Screen name="Maintenance" component={MaintenanceListScreen} />
      <Tab.Screen name="Teams" component={TeamListScreen} />
      <Tab.Screen name="Reports" component={DashboardScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
