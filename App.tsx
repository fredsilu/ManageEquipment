import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
//import { store } from './services/store'; // Make sure to adjust the path to your store file
import AppNavigator from './src/navigation/AppNavigator'; // Adjust the path to your AppNavigator file

const App: React.FC = () => {
  return (
    
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
  
  );
};

export default App;