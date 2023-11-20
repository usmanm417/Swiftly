import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { usePaymentMethods } from './PaymentMethodProvider';

const PaymentMethodScreen = ({ navigation, route }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');
    const [billingAddress, setBillingAddress] = useState('');

    const { paymentMethods, setPaymentMethods } = usePaymentMethods();

    const handleSave = () => {
        Keyboard.dismiss();
        setPaymentMethods([...paymentMethods, { cardNumber, expiryDate, cvv, name, billingAddress }]);
        console.log('Card Info:', cardNumber, expiryDate, cvv, name, billingAddress);
        clearFormFields();
    };

    const handleDelete = (index) => {
        const newCards = paymentMethods.filter((_, i) => i !== index);
        setPaymentMethods(newCards);
    };

    const clearFormFields = () => {
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
        setName('');
        setBillingAddress('');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('UserProfileScreen')}>
            <Image source={require("../assets/backarrow.png")} style={styles.backButton} />
            </TouchableOpacity>
            <Text style={styles.title}>Add Payment Method</Text>
            <TextInput
                style={styles.input}
                placeholder="Name on Card"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Billing Address"
                value={billingAddress}
                onChangeText={setBillingAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Card Number"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Expiry Date (MM/YY)"
                keyboardType="numeric"
                value={expiryDate}
                onChangeText={setExpiryDate}
            />
            <TextInput
                style={styles.input}
                placeholder="CVV"
                keyboardType="numeric"
                value={cvv}
                onChangeText={setCvv}
            />
            <TouchableOpacity style={styles.button4} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Card</Text>
            </TouchableOpacity>

            <ScrollView style={styles.savedCardsContainer}>
                {paymentMethods.map((card, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.cardDetails}>
                            <Text>Name: {card.name}</Text>
                            <Text>Address: {card.billingAddress}</Text>
                            <Text>Card Number: {card.cardNumber}</Text>
                            <Text>Expiry Date: {card.expiryDate}</Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.deleteButton}
                            onPress={() => handleDelete(index)}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity 
                style={styles.backToCartButton}
                onPress={() => navigation.navigate('CheckoutScreen')}>
                <Text style={styles.buttonText}>Back to Checkout</Text>
            </TouchableOpacity>
            
            <View style={styles.buttonContainer}>
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('HomePage')}
                >
                    <Image source={require("../assets/scannerButton.png")} style={styles.bottomButton} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => console.log('Button Pressed')}
                >
                    <Image source={require("../assets/cart.png")} style={styles.bottomButton} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('UserProfileScreen')}
                >
                    <Image source={require("../assets/profile.png")} style={styles.bottomButton} />
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
        paddingTop: 120,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    button4: {
        backgroundColor: 'black', // Set the background color to black
        paddingVertical: 15,      // Vertical padding
        paddingHorizontal: 30,    // Horizontal padding
        borderRadius: 5,          // Rounded corners
        alignItems: 'center',     // Center text horizontally
        justifyContent: 'center', // Center text vertically
        width: '100%',            // Full width
        marginBottom: 20,         // Margin at the bottom
    },
    buttonText: {
        color: 'black',
        fontSize: 15,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        padding: 10,
        width: 35,
        height: 35,
        resizeMode: 'stretch',
    },
    savedCardsContainer: {
        width: '100%',
        height: 10,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    cardDetails: {
        flex: 1,
    },
    deleteButton: {
        backgroundColor: 'black',
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        height: 40,
        marginTop: 15,
    },
    deleteButtonText: {
        color: 'white',
    },
    backToCartButton: {
        backgroundColor: 'black',
        paddingVertical: 15,
        // paddingHorizontal: 30,
        // borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 100,
        width: '150%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 50,
        left: 10,
        right: 10,
        paddingHorizontal: 30,
      },
      buttonText: {
        color: 'white',
      },
      bottomButton: {
        height: 45,
        width: 45,
        resizeMode: 'contain',
        paddingTop: 25,
        borderRadius: 0,
    },
    line: {
        backgroundColor: 'gray',
        height: 1,
        width: '100%',
        position: 'absolute',
        bottom: 120, // Adjust this value based on the height of your button container
      },
});

export default PaymentMethodScreen;
