import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const CartScreen = ({ navigation }) => {
  // Sample data for the table
  const tableData = [
    { item: 'Item 1', quantity: 2, price: '$10' },
    { item: 'Item 2', quantity: 1, price: '$20' },
    // Add more rows as needed
  ];

  return (
    <View style={{ flex: 1 }}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('StoreSelect')}>
            <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Shopping Cart</Text>
        </View>

        <ScrollView style={styles.scrollView}>
            {tableData.map((row, index) => (
            <View key={index} style={styles.tableRow}>
                <Text>{row.item}</Text>
                <Text>{row.quantity}</Text>
                <Text>{row.price}</Text>
            </View>
            ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomePage')}>
            <Text style={styles.buttonText}>Scanner</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => console.log('Button Pressed')}>
            <Text style={styles.buttonText}>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserProfileScreen')}>
            <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
        </View>
    </View>
);
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 70,
        paddingBottom: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 1,
    },
        title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
        scrollView: {
        flex: 1,
        marginTop: 20,
    },
        tableRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 10,
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
        backButton: {
        position: 'absolute',
        top: 30,
        left: 20,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 20,
        width: 60,
        height: 40,
    },
});

export default CartScreen;