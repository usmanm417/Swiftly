import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useCart } from './CartContext';

const CartScreen = ({ navigation, route }) => {
    const { cartData, removeCartItem } = useCart();
    let [hudsonminiskirtQuantity, setHudsonminiskirtQuantity ] = useState(1);
    let [tightpurpleskirtQuantity, setTightpurpleskirtQuantity ] = useState(1);
    const initialState = true;
    let [total, setTotal] = useState(0); // add functionality for this

    const setQuantityMinus = (itemID, index) => {
        if (itemID === 'Hudson Mini Skirt' && hudsonminiskirtQuantity > 0) {
            let newQuantity = hudsonminiskirtQuantity - 1;
            let newTotal = total - 149;
            setTotal(newTotal);
            setHudsonminiskirtQuantity(newQuantity);
            if (newQuantity === 0) {
                removeCartItem(index);
            }
        } else if (itemID === 'Micro Mini Stretch Skirt' && tightpurpleskirtQuantity > 0) {
            let newQuantity = tightpurpleskirtQuantity - 1;
            let newTotal = total - 128;
            setTotal(newTotal);
            setTightpurpleskirtQuantity(newQuantity);
            if (newQuantity === 0) {
                removeCartItem(index);
            }
        };
    }
    
    const setQuantityPlus = (itemID) => {
        if (itemID === 'Hudson Mini Skirt') {
            let newTotal = total + 149;
            setTotal(newTotal);
            setHudsonminiskirtQuantity(prevCount => prevCount + 1);
        } else if (itemID === 'Micro Mini Stretch Skirt') {
            let newTotal = total + 128;
            setTotal(newTotal);
            setTightpurpleskirtQuantity(prevCount1 => prevCount1 + 1);
        };
    }

    const setQuantityDisplay = (itemID) => {
        let returnedNumber = 1;
        if (itemID === 'Hudson Mini Skirt') {
            returnedNumber = hudsonminiskirtQuantity;
            total + 149;
        } else if (itemID === 'Micro Mini Stretch Skirt') {
            returnedNumber = tightpurpleskirtQuantity;
            total + 128;  
        }
        return returnedNumber;
        };


    const setItemPicture = (itemID) => {
        let returnedImage = 0;
        if (itemID === 'Hudson Mini Skirt') {
            returnedImage = require("../assets/hudsonminiskirt-removebg-preview.png");
        } else if (itemID === 'Micro Mini Stretch Skirt') {
            returnedImage = require("../assets/tightpurpleskirt-removebg-preview.png");
        }
        return returnedImage;
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
                        <Image source={setItemPicture(item.item)} style={styles.itemImage} />
                        <View style={styles.textContainer}>
                            <Text style={styles.itemTextName}>{item.item}</Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => setQuantityMinus(item.item, index)}
                                >
                                    <Image source={require("../assets/minus.svg.png")} style={styles.quantityIconMinus} />
                                </TouchableOpacity>
                                <Text style={styles.itemTextQuantity}>{setQuantityDisplay(item.item)}</Text>
                                <TouchableOpacity
                                    style={styles.quantityButton}
                                    onPress={() => setQuantityPlus(item.item)}
                                >
                                    <Image source={require("../assets/plus.png")} style={styles.quantityIconPlus} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.itemTextPrice}>${item.price}</Text>
                        </View>
                        
                    </View>
                ))}
            </ScrollView>
            <Text style={styles.totalText}>Total: $149</Text>
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
        fontSize: 35,
      
        textAlign: 'left'
        
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
        paddingLeft: 245,
        paddingBottom: 175,
        fontSize: 27,
      
    }
});

export default CartScreen;



