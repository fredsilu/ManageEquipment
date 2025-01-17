import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import MaintenanceListScreen from '../screens/Maintenance/MaintenanceListScreen';
import EquipmentDetailsScreen from '../screens/Equipments/EquipmentDetailsScreen';
import EquipmentAddScreen from '../screens/Equipments/EquipmentAddScreen';
import EquipmentListScreen from '../screens/Equipments/EquipmentListScreen';
import TeamListScreen from '../screens/Teams/TeamListScreen';

import DashboardScreen from '../screens/Reports/DashboardScreen';

import ClientsScreen from '../screens/Clients/ClientsScreen';
import ClientAddScreen from '../screens/Clients/ClientAddScreen';
import ClientDetailsScreen from '../screens/Clients/ClientDetailsScreen';

import IngredientsScreen from '../screens/Ingredients/IngredientsScreen';
import IngredientAddScreen from '../screens/Ingredients/IngredientAddScreen';
import IngredientDetailsScreen from '../screens/Ingredients/IngredientDetailsScreen';

import PlatAddScreen from '../screens/Plats/PlatAddScreen';
import PlatsScreen from '../screens/Plats/PlatsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ClientStack = () => (
  <Stack.Navigator>
   
   <Stack.Screen name="Tableau de bord" component={DashboardScreen} />

    <Stack.Screen name="Clients" component={ClientsScreen} />
    <Stack.Screen name="Details Client" component={ClientDetailsScreen} />
    <Stack.Screen name="Ajouter Client" component={ClientAddScreen} />

    <Stack.Screen name="Liste des equipements" component={EquipmentListScreen} />
    <Stack.Screen name="EquipmentDetails" component={EquipmentDetailsScreen} />
    <Stack.Screen name="EquipmentAdd" component={EquipmentAddScreen} />

    <Stack.Screen name="Ingredients" component={IngredientsScreen} />
    <Stack.Screen name="Ajouter Ingredient" component={IngredientAddScreen} />
    <Stack.Screen name="Details Ingredient" component={IngredientDetailsScreen} />
    

    <Stack.Screen name="Ajouter Plat" component={PlatAddScreen} />
    <Stack.Screen name="Plats" component={PlatsScreen} />
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
