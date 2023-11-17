import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import QRCode from 'react-native-qrcode-svg';
import { usePaymentMethods } from './PaymentMethodProvider';

const CheckoutScreen = ({ navigation, route }) => {
    const cartData = route.params?.cartData || [];
    const { paymentMethods } = usePaymentMethods();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods?.[0]?.cardNumber || '');
    const [isPaying, setIsPaying] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [showPaymentMethods, setShowPaymentMethods] = useState(false);

    const handleCheckout = () => {
        setIsPaying(true);
        setTimeout(() => {
            setIsPaying(false);
            setPaymentSuccess(true);
        }, 2000); // Simulate a loading time
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Checkout</Text>
            <ScrollView style={styles.cartItemsContainer}>
                {cartData.map((item, index) => (
                    <Text key={index} style={styles.cartItem}>{item.item} - {item.quantity}</Text>
                ))}
            </ScrollView>
            <View style={styles.pickerContainer}>
                <TouchableOpacity style={styles.button1} onPress={() => setShowPaymentMethods(true)}>
                    <Text style={styles.buttonText}>Select Payment Method</Text>
                </TouchableOpacity>
                {selectedPaymentMethod ? (
                    <Text style={styles.selectedPaymentMethod}>
                        Selected Card: **** **** **** {selectedPaymentMethod.substr(-4)}
                    </Text>
                ) : null}
            </View>
            <TouchableOpacity style={styles.button1} onPress={handleCheckout}>
                <Text style={styles.buttonText}>Pay Now</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showPaymentMethods}
                onRequestClose={() => setShowPaymentMethods(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {paymentMethods.map((method, index) => (
                            <TouchableOpacity 
                                key={index}
                                style={styles.paymentMethodButton}
                                onPress={() => {
                                    setSelectedPaymentMethod(method.cardNumber);
                                    setShowPaymentMethods(false);
                                }}>
                                <Text style={styles.paymentMethodText}>
                                    Card ending in {method.cardNumber.substr(-4)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isPaying || paymentSuccess}
                onRequestClose={() => {
                    setIsPaying(false);
                    setPaymentSuccess(false);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {isPaying ? (
                            <>
                                <ActivityIndicator size="large" color="#0000ff" />
                                <Text style={styles.modalText}>Processing Payment...</Text>
                            </>
                        ) : paymentSuccess ? (
                            <>
                                <Text style={styles.modalText}>Payment Successful!</Text>
                                <QRCode
                                    value={JSON.stringify(cartData)}
                                    size={200}
                                    backgroundColor='white'
                                    color='black'
                                />
                                {/* ... Render the rest of your receipt here ... */}
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setPaymentSuccess(false)}>
                                    <Text style={styles.textStyle}>Close</Text>
                                </TouchableOpacity>
                            </>
                        ) : null}
                    </View>
                </View>
            </Modal>

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
        marginBottom: 20,
    },
    cartItemsContainer: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 20,
        width: '100%',
        maxHeight: 300,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    picker: {
        height: 44,
    },
    button1: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 30,
        width: '80%', // Adjust width as needed
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'center', // Center the button
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    button: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 20,
        elevation: 2,
        marginTop: 10,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '80%',
        marginTop: 20,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cartItem: {
        fontSize: 16,
        marginVertical: 10,
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
        textAlign: 'center',
    },
    paymentMethodButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    paymentMethodText: {
        textAlign: 'center',
        fontSize: 16,
    },
    selectedPaymentMethod: {
        fontSize: 16,
        marginTop: 10,
        color: 'black',
        marginBottom: 20, // Add space between the text and the button
        marginTop: 20,
    },
});

export default CheckoutScreen;
