import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import ChooseLocation from './src/screens/ChooseLocation';
import ListBuses from './src/screens/ListBuses';
import BusInfo from './src/screens/BusInfo';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Location" component={ChooseLocation} />
        <Stack.Screen name="Listing" component={ListBuses} />
        <Stack.Screen name="BusInfo" component={BusInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
