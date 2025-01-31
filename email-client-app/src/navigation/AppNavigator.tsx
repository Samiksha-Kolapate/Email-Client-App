import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreeen';
import EmailEditorScreen from '../screens/EmailEditorScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EmailEditor">
        <Stack.Screen name="EmailEditor" component={HomeScreen} />
        <Stack.Screen name="Email" component={EmailEditorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
