import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StoreSelect = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState('Select store  ▼');
    const data = ['With Jean', 'Guizio', 'WillOfGod', 'Adidas'];
    const navigation = useNavigation();

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        toggleDropdown();
    };

    const handleSelectStore = () => {
        navigation.navigate('HomePage', { selectedStore: selectedItem });
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>Please select a Swiftly partnered store below:</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
                    <Text style={styles.buttonText}>{selectedItem}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSelectStore} style={styles.selectStoreButton}>
                    <Text style={styles.selectStoreButtonText}>Start Scanning!</Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={isDropdownVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setDropdownVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.modalBackground}
                        onPress={() => setDropdownVisible(false)}
                    />
                    <View style={styles.modal}>
                        {data.map((item, index) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => handleSelectItem(item)}
                                style={styles.dropdownItem}
                            >
                                <Text>{item}</Text>
                                {index < data.length - 1 && <View style={styles.separator} />}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonContainer: {
        marginBottom: 10,
    },
    dropdownButton: {
        color: 'white', // Set the text color to white
        padding: 10,
        backgroundColor: 'black', // Set the button background color to black
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        width: 300,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    selectStoreButton: {
        marginTop: 50,
        padding: 10,
        backgroundColor: 'black', // Set the button background color to black
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
        height: 40, // Add this line to specify a height
    },
    selectStoreButtonText: {
        color: 'white', // Set the text color to white
        fontSize: 16,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        width: Dimensions.get('window').width,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 8,
    },
    dropdownItem: {
        padding: 10,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        width: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 55,
        left: 20,
        backgroundColor: 'black',
        paddingHorizontal: 10,
        borderRadius: 20,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default StoreSelect;
