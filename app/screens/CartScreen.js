import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from './CartContext';

const CartScreen = ({ navigation, route }) => {
    const { cartData, setCartData } = useCart();

    useEffect(() => {
        if (route.params?.cartData) {
            setCartData(route.params.cartData);
        }
    }, [route.params?.cartData]);

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
                    <View key={index} style={styles.itemBox}>
                        <Text style={styles.itemText}>Item: {item.item}</Text>
                        <Text style={styles.itemText}>Qty: {item.quantity}</Text>
                        <Text style={styles.itemText}>Price: ${item.price}</Text>
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
    itemBox: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff', // Added for better visibility
    },
    itemText: {
        fontSize: 16,
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
