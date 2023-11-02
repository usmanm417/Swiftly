import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const StoreSelect = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState('Item 1'); // Initial selected item
    const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4']; // Replace with your dynamic data

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        toggleDropdown();
    };

    return (
        <View style={styles.container}>
        <Text>StoreSelect</Text>
        <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
            <Text>{selectedItem}</Text>
        </TouchableOpacity>
        <Modal visible={isDropdownVisible} transparent={true} animationType="slide">
            <View style={styles.modal}>
            {data.map((item) => (
                <TouchableOpacity key={item} onPress={() => handleSelectItem(item)} style={styles.dropdownItem}>
                <Text>{item}</Text>
                </TouchableOpacity>
            ))}
            </View>
        </Modal>
        </View>
    );
};

export default StoreSelect;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    modal: {
        flex: 0.5, // Adjust the height as needed
        width: 200, // Adjust the width as needed
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'gray',
        width: 200,
    },
});
