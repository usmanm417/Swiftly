import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { usePaymentMethods } from './PaymentMethodProvider';
import { useCart } from './CartContext';
import { usePurchaseHistory } from './PurchaseHistoryContext';

const CheckoutScreen = ({ navigation }) => {
    const { cartData, removeCartItem, total } = useCart();
    const { paymentMethods } = usePaymentMethods();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods?.[0]?.cardNumber || '');
    const [isPaying, setIsPaying] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [showPaymentMethods, setShowPaymentMethods] = useState(false);
    const { addPurchase } = usePurchaseHistory();

    const handleCheckout = () => {
        setIsPaying(true);
        setTimeout(() => {
            setIsPaying(false);
            setPaymentSuccess(true);
            addPurchase({ date: new Date(), items: cartData }); // Add the purchase to history
            removeCartItem(null); // Clear all items from the cart
        }, 2000);
    };

    let date = new Date();

    return (
        <View style={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('CartScreen')}
                >
                    <Image source={require("../assets/backarrow.png")} style={styles.backButton} />
                </TouchableOpacity>
            <Text style={styles.title}>Checkout</Text>
            <Text style={styles.summary}>Order Summary</Text>
            <ScrollView style={styles.cartItemsContainer}>
                {cartData.map((item, index) => (
                    <View key={index} style={styles.cartItemView}>
                        <Text style={styles.cartItem}>{item.name} - {item.quantity}</Text>
                        <TouchableOpacity 
                            style={styles.deleteButton}
                            onPress={() => removeCartItem(index)}>
                            <Image source={require("../assets/trash.png")} style={styles.trashButton} />
                        </TouchableOpacity>
                        
                    </View>
                    
                ))}
                
            </ScrollView>
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            {paymentMethods.length === 0 ? (
                <TouchableOpacity
                    style={styles.addPaymentMethodButton}
                    onPress={() => navigation.navigate('PaymentMethodScreen')}>
                    <Text style={styles.buttonText1}>Add payment method</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.pickerContainer}>
                    <TouchableOpacity style={styles.button2} onPress={() => setShowPaymentMethods(true)}>
                        <Text style={styles.buttonTextSelectPaymentMethod}>Select Payment Method</Text>
                    </TouchableOpacity>
                    {selectedPaymentMethod ? (
                        <Text style={styles.selectedPaymentMethod}>
                            Selected Card: **** **** **** {selectedPaymentMethod.substr(-4)}
                        </Text>
                    ) : null}
                </View>
            )}
            
            <TouchableOpacity style={styles.button1} onPress={handleCheckout}>
                <Text style={styles.buttonTextPaymentMethod}>Complete purchase</Text>
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
                                    console.log(method);
                                }
                                }
                                
                                >
                                
                                <Text style={styles.paymentMethodText}>
                                    Card ending in {method.cardNumber.substr(-4)}
                                </Text>
                                
                            </TouchableOpacity>
                        ) ) }
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
                                <ActivityIndicator size="large" color="black" />
                                <Text style={styles.modalText}>Processing Payment...</Text>
                            </>
                        ) : paymentSuccess ? (
                            <>
                                <Image source={require("../assets/checkMark.png")} style={styles.checkMark} />
                                <Text style={styles.modalText}>Payment Completed</Text>
                                <Text style={styles.modalText1}>Purchase #: 152378948</Text>
                                <Text style={styles.modalText1}>Date: 29/11/2023</Text>
                                {/* <ScrollView style={styles.itemList}>
                                {cartData.map((item, index) => (
                                    <View key={index} style={styles.cartItem}>
                                        <Text>{item.item} - {item.quantity}</Text>
                                        <TouchableOpacity onPress={() => removeCartItem(index)}>
                                            <Text style={styles.deleteButtonText}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                                </ScrollView> */}
                                <Text style={styles.qrMessage}>Please  scan receipt with store associate before exiting the store to validate purchase.</Text>
                                <QRCode
                                    value={JSON.stringify(cartData)}
                                    size={200}
                                    backgroundColor='white'
                                    color='black'
                                />
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

            <View style={styles.line}></View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('HomePage')}
                >
                    <Image source={require("../assets/scannerButton.png")} style={styles.bottomButton} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('CartScreen')}
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
    selectCard: {
        color: 'black',
        fontSize: '25',
    },
    trashButton: {
        width: 21,
        height: 21,
        resizeMode: 'stretch',
    },
    summary: {
        alignSelf: 'flex-start',
        fontSize: 22,
        marginBottom: 10,
    },
    backButton: {
        position: 'absolute',
        top: -11,
        left: 9,
        padding: 10,
        width: 35,
        height: 35,
        resizeMode: 'stretch',
    },
    checkMark: {
        position: 'absolute',
        top: 15,
        left: 150,
        padding: 10,
        width: 55,
        height: 55,
        resizeMode: 'stretch',
    },
    pickerContainer: {
        width: '65%'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        marginTop: 70,
    },
    title: {
        fontSize: 35,
        
        marginBottom: 20,
    },
    modalText: {
        fontSize: 21,
        fontWeight:'bold',
        marginBottom: 10,
    },
    cartItemsContainer: {
        borderWidth: 0,
        borderColor: '#000',
        borderRadius: 0,
        width: '100%',
        maxHeight: 300,
        marginBottom: 1,
        backgroundColor: 'white',
        
    },
    button1: {
        backgroundColor: 'black',
        padding: 19,
        width: '100%', // Adjusted width
        alignItems: 'center',
        alignSelf: 'center',
    },
    button2: {
        backgroundColor: 'white',
        padding: 15,
        borderWidth: 1,
        width: '154%',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
    },
    buttonText1: {
        color: 'black',
        fontSize: 15,
    },
    buttonTextSelectPaymentMethod: {
        color: 'black',
        fontSize: 15,
    },
    buttonTextPaymentMethod: {
        color: 'white',
        fontSize: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        borderWidth: 0,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 0,
        padding: 75,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        maxHeight: '80%',
        borderWidth: 0,
    },
    itemList: {
        width: '100%',
        maxHeight: 100,
        marginBottom: 10,
    },
    itemDetail: {
        fontSize: 16,
    },
    qrMessage: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center'
    },
    buttonClose: {
        backgroundColor: 'black',
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
    paymentMethodButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 0,
        marginTop: 10,
        width: '100%'
    },
    paymentMethodText: {
        textAlign: 'center',
        fontSize: 16,
    },
    selectedPaymentMethod: {
        fontSize: 16,
        marginTop: 10,
        color: 'black',
        marginBottom: 20,
    },
    addPaymentMethodButton: {
        backgroundColor: 'white', // Match the color with Pay Now button
        padding: 19,
        width: '100%', // Match the width with Pay Now button
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 30, // Increased from the previous value for more space
        marginBottom: 10, // Adjust as needed to create space above the "Pay Now" button
        borderWidth: 1,
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
        padding: 10,
        borderRadius: 0,
    
    },
    cartItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 0,
        borderColor: '#ccc',
    },
    cartItem: {
        fontSize: 16,
    },
    deleteButton: {
        padding: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'black',
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
        width: '120%',
        position: 'absolute',
        bottom: 120, // Adjust this value based on the height of your button container
      },
      total: {
        position: 'absolute',
        bottom: 130,  // Adjust this value to move the total text down
        right: 20,    // Adjust for alignment, if necessary
        fontSize: 22,
        color: 'black', // Or any color you prefer
        },
});

export default CheckoutScreen;
