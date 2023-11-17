import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import HomePage from './app/screens/HomePage';
import StoreSelect from './app/screens/StoreSelect';
import UserProfileScreen from './app/screens/UserProfileScreen';
import CartScreen from './app/screens/CartScreen';
import PersonalInfoScreen from './app/screens/PersonalInfoScreen';
import CheckoutScreen from './app/screens/CheckoutScreen';
import PaymentMethodScreen from './app/screens/PaymentMethodScreen';
import PurchaseHistoryScreen from './app/screens/PurchaseHistoryScreen';
import { PaymentMethodProvider } from './app/screens/PaymentMethodProvider';
import { CartProvider } from './app/screens/CartContext';
import { PurchaseHistoryProvider } from './app/screens/PurchaseHistoryContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PurchaseHistoryProvider>
      <CartProvider>
        <PaymentMethodProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="HomePage" component={HomePage} />
              <Stack.Screen name="StoreSelect" component={StoreSelect} />
              <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
              <Stack.Screen name="CartScreen" component={CartScreen} />
              <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} />
              <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
              <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen} />
              <Stack.Screen name="PurchaseHistoryScreen" component={PurchaseHistoryScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaymentMethodProvider>
      </CartProvider>
    </PurchaseHistoryProvider>
  );
}