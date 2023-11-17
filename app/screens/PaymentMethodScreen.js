import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { usePaymentMethods } from './PaymentMethodProvider';

const PaymentMethodScreen = ({ navigation }) => {
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
                <Text style={styles.buttonText}>Back</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleSave}>
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
                onPress={() => navigation.navigate('CartScreen')}>
                <Text style={styles.buttonText}>Back to Cart</Text>
            </TouchableOpacity>
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
    button: {
        backgroundColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
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
    },
    savedCardsContainer: {
        width: '100%',
        marginTop: 20,
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
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        position: 'absolute',
        bottom: 20,
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center',
    },    
});

export default PaymentMethodScreen;
