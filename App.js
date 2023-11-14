import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import HomePage from './app/screens/HomePage';
import StoreSelect from './app/screens/StoreSelect';
import UserProfileScreen from './app/screens/UserProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="UserProfileScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="StoreSelect" component={StoreSelect} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}