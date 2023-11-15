import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here with 'username' and 'password' values
        navigation.navigate('StoreSelect');
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

<<<<<<< HEAD:app/frontend/LoginScreen.js
            <br></br>

            <Text style={styles.textBetween}><b>━━━━━━ OR ━━━━━━</b></Text>

            <br></br>
=======
            <Text style={styles.textBetween}>━━━━━━ OR ━━━━━━</Text>
>>>>>>> fbbc35dc06ffa1b83319386a240de8e2d0cc169a:app/screens/LoginScreen.js

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
<<<<<<< HEAD:app/frontend/LoginScreen.js
        top: 30,
=======
        top: 55,
>>>>>>> fbbc35dc06ffa1b83319386a240de8e2d0cc169a:app/screens/LoginScreen.js
        left: 20,
        backgroundColor: 'black',
        paddingHorizontal: 10, // Adjusted padding for symmetry
        borderRadius: 20,
        height: 35,
        justifyContent: 'center', // Added to vertically center the text
    },
    textBetween: {
        fontSize: 18
    }
});

export default LoginScreen;