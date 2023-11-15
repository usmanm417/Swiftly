import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    

    const handleRegister = async () => {
        if (!username || !email || !password) {
            alert("Please fill all fields");
            return;
        }
    
        if (!isValidEmail(email)) {
            alert("Invalid email");
            return;
        }

        try {
            await AsyncStorage.setItem('userCredentials', JSON.stringify({ username, email, password }));
            navigation.navigate('StoreSelect');
        } catch (error) {
            console.error('Failed to save the data to the storage', error);
        }
    };

    const handleLogin = () => {
        navigation.navigate('LoginScreen');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('WelcomeScreen')}>
                    <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Create an Account</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.roundedButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            <Text style={styles.textBetween}>━━━━━━ OR ━━━━━━</Text>
            
            <TouchableOpacity style={styles.roundedButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
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
        paddingHorizontal: 10,
        borderRadius: 20,
        height: 35,
        justifyContent: 'center',
    },
    textBetween: {
        marginTop: 10,
        marginBottom: 10,
    }
});

export default RegisterScreen;