import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

const HomePage = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned');

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted');
        })();
    };

    // Here we request the camera permission from the user
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // Process of actually scanning barcode/qr code
    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        // Send request to your server
        try {
            const response = await fetch('http://localhost:3000/getitem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: data })
            });
            const itemData = await response.json();
            setText(itemData.name || 'Item not found');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // The following 2 if conditions will check and return the proper prompt/view
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting camera permission</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <TouchableOpacity style={styles.button} onPress={() => askForCameraPermission()}>
                    <Text style={styles.buttonText}>Allow Camera</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('StoreSelect')}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Scan Items Below!</Text>
            <View style={styles.barcodebox}>
                <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{ height: 400, width: 400 }} />
            </View>
            <Text style={styles.maintext}>{text}</Text>

            {scanned && (
                <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
                    <Text style={styles.buttonText}>Scan again?</Text>
                </TouchableOpacity>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Button 1 Pressed')}>
                    <Text style={styles.buttonText}>Scanner</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CartScreen')}>
                    <Text style={styles.buttonText}>Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserProfileScreen')}>
                    <Text style={styles.buttonText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100,
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 350,
        width: 320,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'gray',
    },
    maintext: {
        fontSize: 16,
        margin: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 20,
    },
    header: {
        position: 'absolute',
        top: 30, 
        left: 20,
        zIndex: 1,
    },
    backButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 20,
        width: 60,
        height: 40,
        marginTop: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 40,
        left: 10,
        right: 10,
    },
    button: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        alignContent: 'center',
    },
});

export default HomePage;