import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            navigation.navigate('StoreSelect');
        } catch (error) {
            console.log(error);
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
                value = {email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value = {password}
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