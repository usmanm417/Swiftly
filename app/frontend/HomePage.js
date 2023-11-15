import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const CartScreen = ({ navigation }) => {
  // Sample data for the table
  const tableData = [
    { item: 'Item 1', quantity: 2, price: '$10' },
    { item: 'Item 2', quantity: 1, price: '$20' },
    // Add more rows as needed
  ];

  return (
    <View style={{ flex: 1 }}>
      
      <ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('StoreSelect')}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
        <View>
          {tableData.map((row, index) => (
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
              <Text>{row.item}</Text>
              <Text>{row.quantity}</Text>
              <Text>{row.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// Add the styles for the back button
const styles = StyleSheet.create({
  backButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10, // adjust as needed
  },
  buttonText: {
    color: 'white', // adjust text color as needed
  },
});

export default CartScreen;
