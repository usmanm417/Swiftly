import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalInfoScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('Enter Phone Number');
    const [isEditing, setIsEditing] = useState({ name: false, email: false, username: false, phoneNumber: false });

    useEffect(() => {
        const loadUserData = async () => {
            try {
                // Load user data from AsyncStorage
                const userDataString = await AsyncStorage.getItem('userCredentials');
                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                    setName(userData.name);
                    setEmail(userData.email);
                    setUsername(userData.username);
                }
            } catch (error) {
                console.error('Failed to load user data', error);
            }
        };

        loadUserData();
    }, []);

const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
};

const handleSave = (field) => {
    setIsEditing({ ...isEditing, [field]: false });
};

return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('UserProfileScreen')}>
        <Image source={require("../assets/backarrow.png")} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Personal Information</Text>
        <EditableField
            label="Name"
            value={name}
            isEditing={isEditing.name}
            onChangeText={setName}
            onEdit={() => handleEdit('name')}
            onSave={() => handleSave('name')}
        />
        <EditableField
            label="Email"
            value={email}
            isEditing={isEditing.email}
            onChangeText={setEmail}
            onEdit={() => handleEdit('email')}
            onSave={() => handleSave('email')}
        />
        <EditableField
            label="Username"
            value={username}
            isEditing={isEditing.username}
            onChangeText={setUsername}
            onEdit={() => handleEdit('username')}
            onSave={() => handleSave('username')}
        />
        <EditableField
            label="Phone Number"
            value={phoneNumber}
            isEditing={isEditing.phoneNumber}
            onChangeText={setPhoneNumber}
            onEdit={() => handleEdit('phoneNumber')}
            onSave={() => handleSave('phoneNumber')}
        />
        <View style={styles.buttonContainer}>
        <View style={styles.line}></View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('HomePage')}
                >
                    <Image source={require("../assets/scannerButton.png")} style={styles.bottomButton} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('CartScreen')}
                >
                    <Image source={require("../assets/cart.png")} style={styles.bottomButton} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('UserProfileScreen')}
                >
                    <Image source={require("../assets/profile.png")} style={styles.bottomButton} />
                </TouchableOpacity>
            </View>
        </View>
  );
};

const EditableField = ({ label, value, isEditing, onChangeText, onEdit, onSave }) => (
    <View style={styles.fieldContainer}>
    
        <Text style={styles.label}>{label}</Text>
        <View style={styles.valueContainer}>
        {isEditing ? (
        <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
        ) : (
        <Text onPress={onEdit} style={styles.value}>{value}</Text>
        )}
        {isEditing && (
        <TouchableOpacity style={styles.backButton} onPress={onSave}>
            <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        )}
    </View>
  </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10, // Space between title and fields
        textAlign: 'center', // Center text horizontally
        marginTop: 55,
    },
    fieldContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    value: {
        fontSize: 16,
    },
    input: {
        borderBottomWidth: 1,
        fontSize: 16,
        marginRight: 10,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        padding: 10,
        width: 35,
        height: 35,
        resizeMode: 'stretch',
    },
    buttonText: {
        color: 'white',
    },
    line: {
        backgroundColor: 'gray',
        height: 1,
        width: '200%', // The line will extend to the full width of the container
        position: 'absolute',
        bottom: 80, // Position the line above the buttons
        left: -25, // Counteract the container's padding on the left
        right: -25, // Counteract the container's padding on the right
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 40,
        left: 10,
        right: 10,
        paddingHorizontal: 30,
      },
    button: {
        padding: 10,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
    },
    bottomButton: {
        height: 45, // Set the fixed height for the image
        width: 45, // Set the fixed width for the image
        resizeMode: 'contain', // This will ensure the image scales within the given dimensions
    },
});

export default PersonalInfoScreen;
