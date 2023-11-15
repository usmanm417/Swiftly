import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const CartScreen = ({ navigation }) => {
  // Sample data for the table
  const tableData = [
    { item: 'Item 1', quantity: 2, price: '$10' },
    { item: 'Item 2', quantity: 1, price: '$20' },
    // Add more rows as needed
  ];

  return (
    <ScrollView>
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
  );
}

// Setting the navigation options for the screen
CartScreen.navigationOptions = ({ navigation }) => ({
  title: 'Cart', // Set the title of the screen
  headerLeft: () => (
    <Button
      onPress={() => navigation.goBack()}
      title="Back"
      color="#000"
    />
  ),
});

export default CartScreen;
