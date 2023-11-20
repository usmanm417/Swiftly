import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
                navigation.navigate('HomePage', { selectedStore: selectedItem });
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
            <Image source={require("../assets/backarrow.png")} style={styles.backButton} />
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
            <TouchableOpacity style={styles.roundedButtonLogin} onPress={handleLogin}>
                <Text style={styles.buttonTextLogin}>Sign in</Text>
            </TouchableOpacity>

            <Text style={styles.textBetween}>━━━━━━━━━━ OR ━━━━━━━━━━</Text>

            <TouchableOpacity style={styles.roundedButtonCreate} onPress={handleCreateAccount}>
                <Text style={styles.buttonTextCreate}>Create account</Text>
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
        borderBottomColor: 'gray', // only the bottom line
        borderBottomWidth: 1, // width of the bottom line
        marginBottom: 20,
        padding: 10,
    },
    roundedButtonCreate: {
        backgroundColor: 'black',
        padding: 11,
        width: '80%',
        alignItems: 'center',
        marginTop: 31,
    },
    roundedButtonLogin: {
        backgroundColor: 'white', 
        padding: 10,
        width: '80%',
        alignItems: 'center',
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 25
    },
    buttonTextCreate: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Avenir'
    },
    buttonTextLogin: {
        color: 'black',
        fontSize: 18,
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 5,
        padding: 10,
        width: 30,
        height: 30,
        resizeMode: 'stretch',
    },
    textBetween: {
        marginTop: 10,
        color: 'gray',
    }
});

export default LoginScreen;