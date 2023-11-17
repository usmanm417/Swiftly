import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PersonalInfoScreen = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('Enter Phone Number');
    const [isEditing, setIsEditing] = useState({ name: false, email: false, username: false, phoneNumber: false });

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('userCredentials');
                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                    setName(userData.name)
                    setEmail(userData.email);
                    setUserName(userData.username);
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
            <Text style={styles.buttonText}>Back</Text>
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
            onChangeText={setUserName}
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
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomePage')}>
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
        padding: 20,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10, // Space between title and fields
        textAlign: 'center', // Center text horizontally
        marginTop: 15,
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
        backgroundColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: 10,
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
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
    },
});

export default PersonalInfoScreen;
