import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreeen';
import EmailEditorScreen from '../screens/EmailEditorScreen';
import LoginScreen from '../screens/loginScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Email Editor" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Email Editor" component={HomeScreen}  />
        <Stack.Screen name="Email" component={EmailEditorScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
