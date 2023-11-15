import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { usePaymentMethods } from './PaymentMethodProvider';

const CheckoutScreen = ({ navigation, route }) => {
    const cartData = route.params?.cartData || [];
    const { paymentMethods } = usePaymentMethods();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods?.[0]?.cardNumber || '');

    const handleCheckout = () => {
        console.log('Checkout with:', selectedPaymentMethod);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Checkout</Text>
            <ScrollView style={styles.cartItemsContainer}>
                {cartData.map((item, index) => (
                    <Text key={index} style={styles.cartItem}>{item.item} - {item.quantity}</Text>
                ))}
            </ScrollView>
            <Text style={styles.subtitle}>Select Payment Method:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedPaymentMethod}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}>
                    {paymentMethods.map((method, index) => (
                        <Picker.Item key={index} label={`Card ending in ${method.cardNumber.substr(-4)}`} value={method.cardNumber} />
                    ))}
                </Picker>
            </View>
            <TouchableOpacity style={styles.button1} onPress={handleCheckout}>
                <Text style={styles.buttonText}>Pay Now</Text>
            </TouchableOpacity>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        marginTop: 70,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20, // Added margin to move the title down
    },
    cartItemsContainer: {
        borderWidth: 1,
        borderRadius: 20,
        width: '100%',
        // Adjust the max height to ensure there is space for the picker and button
        maxHeight: 300, // This value might need to be adjusted
    },
    subtitle: {
        fontSize: 18,
        marginTop: 20,
        // Added margin bottom to ensure space between subtitle and picker
        marginBottom: 10,
    },
    pickerContainer: {
        width: '100%',
        // Added margin bottom to ensure space between picker and button
        marginBottom: 20,
    },
    picker: {
        width: '100%',
        height: 44,
    },
    button1: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 30,
        // Adjusted margin top for spacing, you might need to increase this
        marginTop: 100,
        width: '60%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
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
});

export default CheckoutScreen;
