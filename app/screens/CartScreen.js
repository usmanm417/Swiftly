import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useCart } from './CartContext';

const CartScreen = ({ navigation, route }) => {
    const { cartData, removeCartItem} = useCart();
    const [total, setTotal] = useState(0);

    const setItemPicture = (itemName) => {
        switch (itemName) {
            case 'Hudson Mini Skirt':
                return require("../assets/hudsonminiskirt-removebg-preview.png");
            case 'Micro Mini Stretch Skirt':
                return require("../assets/tightpurpleskirt-removebg-preview.png");
            // Add more cases for other items as needed
            default:
                // Return a default image or handle this case accordingly
                return require("../assets/logo.png");
        }
    };

    useEffect(() => {
        // Calculate the total price based on items in the cart
        const newTotal = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(newTotal);
    }, [cartData]);



    const setQuantityMinus = (item, index) => {
        if (item.quantity > 0) {
            const updatedCartData = [...cartData];
            updatedCartData[index].quantity -= 1;
            setTotal(total - item.price);
            if (updatedCartData[index].quantity === 0) {
                removeCartItem(index);
            }
        }
    };

    const setQuantityPlus = (item, index) => {
        const updatedCartData = [...cartData];
        updatedCartData[index].quantity += 1;
        setTotal(total + item.price);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('HomePage')}
                >
                    <Image source={require("../assets/backarrow.png")} style={styles.backButton} />
                </TouchableOpacity>
                <Text style={styles.title}>Shopping Cart</Text>
            </View>
            
            <ScrollView style={styles.scrollView}>
                {cartData.map((item, index) => (
                    <View key={index} style={styles.itemBox}>
                        <Image source={setItemPicture(item.name)} style={styles.itemImage} />
                        <View style={styles.textContainer}>
                            <Text style={styles.itemTextName}>{item.name}</Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => setQuantityMinus(item, index)}
                                >
                                    <Image source={require("../assets/minus.svg.png")} style={styles.quantityIconMinus} />
                                </TouchableOpacity>
                                <Text style={styles.itemTextQuantity}>{item.quantity}</Text>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => setQuantityPlus(item, index)}
                                >
                                    <Image source={require("../assets/plus.png")} style={styles.quantityIconPlus} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.itemTextPrice}>${item.price}</Text>
                        </View>
                        
                    </View>
                ))}
            </ScrollView>
            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
            <View style={styles.checkoutButtonContainer}>
            <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={() => navigation.navigate('CheckoutScreen', { cartData, total })}
                >
                    <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
            </View>

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
    header: {
        paddingTop: 100,
        paddingBottom: 0,
        paddingLeft: 20,
        zIndex: 1,
        
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
        marginTop: 20,
    },
    itemBox: {
        marginBottom: 10,
        backgroundColor: '#F2F2F2',
        flexDirection: 'row', // Aligns children in a row
        justifyContent: 'flex-start', // Puts space between the text and image
        alignItems: 'flex-start',
        
    },
    itemTextName: {
        fontSize: 23,
        marginBottom: 5, // Add a bottom margin for spacing
        
       
        paddingLeft: 9,
        marginTop: 25,
        marginLeft: 7,
    },
    itemTextQuantity: {
        fontSize: 19,
        marginBottom: 9, // Add a bottom margin for spacing
       
        paddingLeft: 9,
        marginTop: 10,
    },
    itemTextPrice: {
        fontSize: 21,
        marginBottom: 5, // Add a bottom margin for spacing
        
        paddingLeft: 9,
        marginTop: 10,
        marginLeft: 7,
    },
    deleteButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        marginTop: 10, // Adjust margin as needed
        alignSelf: 'flex-end', // Align to the end of the itemBox
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 40,
        left: 10,
        right: 10,
        paddingHorizontal: 30,
    },
    checkoutButtonContainer: {
        position: 'absolute',
        bottom: 75,
        left: 0,
        right: 0,
    },
    checkoutButton: {
        backgroundColor: 'black',
        paddingVertical: 15,
        // paddingHorizontal: 30,
        // borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 30,
        width: '100%',
        paddingTop: 12,
        paddingBottom: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
        
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 7,
        padding: 10,
        width: 30,
        height: 30,
        resizeMode: 'stretch',
    },
    itemImage: {
        width: 185, // adjust the width as needed
        height: 185, // adjust the height as needed
        resizeMode: 'cover',
        backgroundColor: '#F2F2F2',
    },
    textContainer: {
        flex: 1, // Takes up the remaining space beside the image
        justifyContent: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    quantityButton: {
        // Style for your plus and minus buttons
        
        padding: 8,
        marginHorizontal: 7, // Space between buttons and quantity text
    },
    quantityIconMinus: {
        // If your icons are not SVGs, you may want to use png files instead
        width: 20, // Set your desired size
        height: 20, // Set your desired size
        resizeMode: 'contain',
    },
    quantityIconPlus: {
        // If your icons are not SVGs, you may want to use png files instead
        width: 24, // Set your desired size
        height: 24, // Set your desired size
        resizeMode: 'contain',
    },
    bottomButton: {
        height: 45,
        width: 45,
        resizeMode: 'contain',
        paddingTop: 25,
        borderRadius: 0,
    },
    totalText: {
        paddingLeft: 215,
        paddingBottom: 170,
        fontSize: 27,
    }
});

export default CartScreen;



