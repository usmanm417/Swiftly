import React, { useState } from 'react';
import { Image, View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    

    const handleRegister = async () => {
        if (!name || !username || !email || !password) {
            alert("Please fill all fields");
            return;
        }
    
        if (!isValidEmail(email)) {
            alert("Invalid email");
            return;
        }

        try {
            await AsyncStorage.setItem('userCredentials', JSON.stringify({ name, username, email, password }));
            // Navigate to the next screen after saving user data
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
            <Image source={require("../assets/backarrow.png")} style={styles.backButton} />
            </TouchableOpacity>
            <Text style={styles.title}>Create Account</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(text) => setName(text)}
            />
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
            <TouchableOpacity style={styles.roundedButtonLogin} onPress={handleRegister}>
                <Text style={styles.buttonTextLogin}>Create account</Text>
            </TouchableOpacity>

            <Text style={styles.textBetween}>━━━━━━━━━━ OR ━━━━━━━━━━</Text>
            
            <TouchableOpacity style={styles.roundedButtonCreate} onPress={handleLogin}>
                <Text style={styles.buttonTextCreate}>Sign in</Text>
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
        marginTop: 20,
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
        marginBottom: 10,
        color: 'gray',
        fontFamily: 'Avenir',
    }
});

export default RegisterScreen;