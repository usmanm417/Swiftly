import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function WelcomeScreen({ navigation }) {
    const handleLoginPress = () => {
        navigation.navigate('LoginScreen');
    };
    
    const handleRegisterPress = () => {
        navigation.navigate('RegisterScreen');
    };

    return (
        <ImageBackground style={styles.background} source={require("../assets/background.png")}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/logo.png")} />
                
                <Text style={styles.name}>Swiftly</Text>
                
                <Text>Redefining the shopping experience</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
                    <Text style={styles.buttonText}>Create an Account</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    button: {
        width: '80%',
        height: 70,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        borderRadius: 35,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    buttonContainer: {
        width: '100%',
        position: 'absolute',
        top: 550,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    logoContainer: {
        position: "absolute",
        top: 140,
        alignItems: "center",
    },
});

export default WelcomeScreen;