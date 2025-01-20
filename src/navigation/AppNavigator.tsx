import React from 'react';
import { StyleSheet } from 'react-native';

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
import PlatDetailsScreen from '../screens/Plats/PlatDetailsScreen';

import test from '../screens/Plats/test';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type ClientStackParamList = {
  TableauBord: undefined;
  Clients: undefined;
  DetailsClient: undefined;
  AjouterClient: undefined;
  'Liste des equipements': undefined;
  EquipmentDetails: undefined;
  EquipmentAdd: undefined;
  Ingredients: undefined;
  AjouterIngredient: undefined;
  DetailsIngredient: { ingredientId: string };
  AjouterPlat: undefined;
  Plats: undefined;
};

const ClientStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>



    <Stack.Screen name="TableauBord" component={DashboardScreen} />

    <Stack.Screen name="Clients" component={ClientsScreen} />
    <Stack.Screen name="DetailsClient" component={ClientDetailsScreen} />
    <Stack.Screen name="AjouterClient" component={ClientAddScreen} />

    <Stack.Screen name="Liste des equipements" component={EquipmentListScreen} />
    <Stack.Screen name="EquipmentDetails" component={EquipmentDetailsScreen} />
    <Stack.Screen name="EquipmentAdd" component={EquipmentAddScreen} />

    <Stack.Screen name="Ingredients" component={IngredientsScreen} />
    <Stack.Screen name="AjouterIngredient" component={IngredientAddScreen} />
    <Stack.Screen name="DetailsIngredient" component={IngredientDetailsScreen} />


    <Stack.Screen name="AjouterPlat" component={PlatAddScreen} />
    <Stack.Screen name="Plats" component={PlatsScreen} />
    <Stack.Screen name="DetailsPlat" component={PlatDetailsScreen} />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen name="Client" component={ClientStack} />
      <Tab.Screen name="Maintenance" component={MaintenanceListScreen} />
      <Tab.Screen name="Teams" component={TeamListScreen} />
      <Tab.Screen name="Reports" component={DashboardScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    marginBottom: 20,
    marginTop: 1,
    height: 40,
  },
  tabLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  
  },
});




export default AppNavigator;
