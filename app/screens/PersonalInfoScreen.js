import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

const PersonalInfoScreen = ({ navigation, route }) => {
    const [name, setName] = useState('Omar Siddiq');
    const [email, setEmail] = useState('osiddiq3@gatech.edu');
    const [username, setUserName] = useState('osiddiq4');
    const [phoneNumber, setPhoneNumber] = useState('404-933-5111')
    const [isEditing, setIsEditing] = useState({ name: false, email: false, username: false, phoneNumber: false });

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
});

export default PersonalInfoScreen;
