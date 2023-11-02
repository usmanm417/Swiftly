import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import Homepage from './app/screens/Homepage';

const AppNavigator = createStackNavigator(
    {
        WelcomeScreen: WelcomeScreen,
        LoginScreen: LoginScreen,
        RegisterScreen: RegisterScreen,
        Homepage: Homepage,
    },
    {
        initialRouteName: 'WelcomeScreen',
        headerMode: 'none',
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
    return (
        <NavigationContainer>
        <AppContainer />
        </NavigationContainer>
    );
}
