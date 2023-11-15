import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Handle registration logic here with 'username', 'email', and 'password' values
        navigation.navigate('StoreSelect');
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
<<<<<<< HEAD:app/frontend/RegisterScreen.js
           
            <br></br>

            <Text style={styles.textBetween}><b>━━━━━━ OR ━━━━━━</b></Text>

            <br></br>
=======

            <Text style={styles.textBetween}>━━━━━━ OR ━━━━━━</Text>
>>>>>>> fbbc35dc06ffa1b83319386a240de8e2d0cc169a:app/screens/RegisterScreen.js
            
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
<<<<<<< HEAD:app/frontend/RegisterScreen.js
        top: 30,
=======
        top: 55,
>>>>>>> fbbc35dc06ffa1b83319386a240de8e2d0cc169a:app/screens/RegisterScreen.js
        left: 20,
        backgroundColor: 'black',
        paddingHorizontal: 10,
        borderRadius: 20,
        height: 35,
        justifyContent: 'center',
    },
});

export default RegisterScreen;