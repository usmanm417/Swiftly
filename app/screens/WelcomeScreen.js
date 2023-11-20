import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';

function WelcomeScreen({ navigation }) {
  const handleLoginPress = () => {
    navigation.navigate('LoginScreen');
  };

  const handleRegisterPress = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <>
    <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground 
        style={styles.background} 
        source={require("../assets/intro.png")} // Make sure this is the correct image path
        resizeMode="cover" // This will cover the entire background
      >
        <View style={styles.topContainer}>
          <Text style={styles.name}>SWIFTLY</Text>
        </View>
        <Text style={styles.subtitle1}>Check out in-app and avoid the lines.</Text>
        <Text style={styles.subtitle}>Discover the Swiftly shopping experience.</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonLogin} onPress={handleLoginPress}>
            <Text style={styles.buttonTextLogin}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonCreate} onPress={handleRegisterPress}>
            <Text style={styles.buttonTextCreate}>Create account</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  
  background: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: StatusBar.currentHeight, // Add padding to account for the status bar
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 60, // Adjust this value to ensure "Swiftly" is correctly positioned
  },
  buttonCreate: {
    width: '79%',
    height: 60,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 95,
  },
  buttonLogin: {
    width: '79%',
    height: 60,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonTextCreate: {
    color: 'white',
    fontSize: 20,
  },
  buttonTextLogin: {
    color: 'black',
    fontSize: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingBottom: 20, // Adjust this value to make sure buttons don't go off the screen
  },
  name: {
    fontSize: 55,

    color: 'black',
    paddingTop: 50,
    fontWeight: 'regular',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20, // Add padding for side spacing
    paddingBottom: 35,
  },
  subtitle1: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20, // Add padding for side spacing
    paddingTop:375,
  },
});

export default WelcomeScreen;
