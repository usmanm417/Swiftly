import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const storedCredentials = await AsyncStorage.getItem('userCredentials');
            const { username: storedUsername, password: storedPassword } = JSON.parse(storedCredentials || '{}');
    
            if (username === storedUsername && password === storedPassword) {
                // User is authenticated
                navigation.navigate('StoreSelect');
            } else {
                // Handle authentication failure
            }
        } catch (error) {
            console.error('Failed to read the data from the storage', error);
        }
    };
    
    const handleCreateAccount = () => {
        navigation.navigate('RegisterScreen');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('WelcomeScreen')}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Sign in to your account</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.roundedButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.textBetween}>━━━━━━ OR ━━━━━━</Text>

            <TouchableOpacity style={styles.roundedButton} onPress={handleCreateAccount}>
                <Text style={styles.buttonText}>Create an Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    roundedButton: {
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 10,
        width: '80%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    backButton: {
        position: 'absolute',
        top: 55,
        left: 20,
        backgroundColor: 'black',
        paddingHorizontal: 10, // Adjusted padding for symmetry
        borderRadius: 20,
        height: 35,
        justifyContent: 'center', // Added to vertically center the text
    },
    textBetween: {
        marginTop: 10,
    }
});

export default LoginScreen;