import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const CartScreen = ({ navigation, route }) => {
    // Initialize the cart data from the route parameters or use an empty array
    const initialCartData = route.params?.cartData || [];
    const [cartData, setCartData] = useState(initialCartData);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('StoreSelect')}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Shopping Cart</Text>
            </View>

            <ScrollView style={styles.scrollView}>
                {cartData.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text>{item.item}</Text>
                        <Text>{item.quantity}</Text>
                        <Text>{item.price}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.checkoutButtonContainer}>
                <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={() => navigation.navigate('CheckoutScreen', { cartData })}
                >
                    <Text style={styles.buttonText}>Checkout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('HomePage')}
                >
                    <Text style={styles.buttonText}>Scanner</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => console.log('Button Pressed')}
                >
                    <Text style={styles.buttonText}>Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('UserProfileScreen')}
                >
                    <Text style={styles.buttonText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 100,
        paddingBottom: 10,
        alignItems: 'center',
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
    checkoutButtonContainer: {
        position: 'absolute',
        bottom: 100,
        left: 10,
        right: 10,
    },
    checkoutButton: {
        backgroundColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 30,
        width: 200,
    },
    buttonText: {
        color: 'white',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 20,
        width: 55,
        height: 40,
    },
});

export default CartScreen;
