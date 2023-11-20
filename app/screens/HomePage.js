import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { firebase } from '../../config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useCart } from './CartContext';

const HomePage = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [itemDetails, setItemDetails] = useState({});
    const { addCartItem } = useCart();
    
    

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    };

    useEffect(() => {
        askForCameraPermission();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data);
        console.log(data);
        fetchItemData(data);
    };

    const fetchItemData = async (barcodeId) => {
        const db = firebase.firestore();
        const itemRef = collection(db, 'items');
        const barcodeString = String(barcodeId).trim();

        try {
            const q = query(itemRef, where("itemID", "==", barcodeString));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setText('No item with this barcode exists in the database.');
            } else {
                const doc = querySnapshot.docs[0]; // Assuming each barcode ID is unique
                setItemDetails(doc.data());
                setIsModalVisible(true);
            }
        } catch (error) {
            console.error("Error fetching item data: ", error);
            setText('Error fetching item data.');
        }
    };

    // Request camera permission view
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting camera permission</Text>
            </View>
        );
    }

    // No camera access view
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <TouchableOpacity style={styles.button} onPress={askForCameraPermission}>
                    <Text style={styles.buttonText}>Allow Camera</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const addItemToCart = () => {
        const itemToAdd = {
            item: itemDetails.name,
            quantity: 1,
            price: itemDetails.price
        };
        addCartItem(itemToAdd); // Use addCartItem to update the cart
        setIsModalVisible(false);
        navigation.navigate('CartScreen');
    }; 

    const setItemPicture = (barcodeId) => {
        let returnedImage = 0;
        if (barcodeId === '9353636023419') {
            returnedImage = require("../assets/hudsonminiskirt.png");
        } else if (barcodeId === '0197346016694') {
            returnedImage = require("../assets/tightpurpleskirt.png")
        }
        return returnedImage;
    };
    

    // Main view
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('StoreSelect')}>
                    <Image source={require("../assets/backarrow.png")} style={styles.backButton} />
                </TouchableOpacity>
            </View>
          
            <View style={styles.barcodeBox}>
                <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.barcodeScanner} />
            </View>
            {scanned && (
                <TouchableOpacity style={styles.buttonScanAgain} onPress={() => setScanned(false)}>
                    <Text style={styles.buttonTextScanAgain}>Click to scan again</Text>
                </TouchableOpacity>
            )}
            <Text style={styles.title}>See something you like? Scan the tag!</Text>
          

            

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.backBut}
                        onPress={() => setIsModalVisible(false)}>
                    
                        <Image source={require("../assets/backarrow.png")} style={styles.backButton} />
                    </TouchableOpacity>
                    <Image source={setItemPicture(itemDetails.itemID)} style={styles.itemImage} />
                    <Text style={styles.itemTitle}>{itemDetails.name}</Text>
                    <Text style={styles.itemDetail}>Price: ${itemDetails.price}</Text>
                    <Text style={styles.itemDetail}>Size: {itemDetails.size}</Text>
                    <Text style={styles.itemDetail}>Color: {itemDetails.color}</Text>
                    <Text style={styles.itemDetail}>Material: {itemDetails.material}</Text>
                    
                    <View style={styles.buttonRow}>
                    
                    <TouchableOpacity
                        style={styles.modalButtonAdd}
                        onPress={() => {
                        addItemToCart()
                        }}
                    >
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                        <View style={styles.buttonContainerModal}>
                            <TouchableOpacity
                                style={styles.bottomButtonModal}
                                onPress={() => navigation.navigate('HomePage')}
                            >
                                <Image source={require("../assets/scannerButton.png")} style={styles.bottomButton} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.bottomButtonModal}
                                onPress={() => console.log('Button Pressed')}
                            >
                                <Image source={require("../assets/cart.png")} style={styles.bottomButton} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.bottomButtonModal}
                                onPress={() => navigation.navigate('UserProfileScreen')}
                            >
                                <Image source={require("../assets/profile.png")} style={styles.bottomButton} />
                            </TouchableOpacity>
            </View>
                    </View>
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
    bottomButtonModal: {
        height: 65,
        width: 65,
        marginRight: 25,
        marginLeft: 45,
        resizeMode: 'contain',
        paddingTop: 25,
        borderRadius: 0
    },
    modalButtonAdd: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '500%',
        elevation: 2,
        borderRadius: 0,
        backgroundColor: 'black'
    },
    backBut: {
        alignSelf:'flex-start',
        marginLeft: -40,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100,
    },
    barcodeBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 500,
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'gray',
    },
    maintext: {
        fontSize: 16,
        margin: 20,
    },
    title: {
        fontSize: 30,
        margin: 20,
        textAlign: 'center'
    },
    header: {
        position: 'absolute',
        top: 30, 
        left: 20,
        zIndex: 1,
        alignItems: 'center'
    },
    line: {
        backgroundColor: 'gray',
        height: 1,
        width: '100%',
        position: 'absolute',
        bottom: 120, // Adjust this value based on the height of your button container
      },
    backButton: {
        position: 'absolute',
        top: 0,
        left: -5,
        padding: 10,
        width: 30,
        height: 30,
        resizeMode: 'stretch',
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
    buttonContainerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: -55,
        left: -51,
        right: 10,
        marginTop: 70,
    },
    button: {
        padding: 10,
        borderRadius: 20,
    },
    buttonScanAgain: {
        borderWidth: 3,
        borderColor: 'black',
        padding: 10,
        left: 0,
        top: -275,
    },
    button1: {
        padding: 10,
        borderRadius: 20,
        marginTop: 45
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
    },
    buttonTextScanAgain: {
        color: 'black',
        textAlign: 'center',
        fontSize: 35,
    },

    barcodeScanner: {
        height: '100%',
        width: '100%',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        width: '100%', // Set a fixed width for the modal
        height: '105%',
        backgroundColor: 'white',
        borderRadius: 0,
        padding: 55,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
    },
    itemDetail: {
        fontSize: 17,
        marginVertical: 4,
        marginTop: 0,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%', // Ensure the button row takes the full width of the modal
        marginTop: 20,
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
        borderRadius: 20,
    },
    buttonYes: {
        backgroundColor: 'black', // A green color for confirmation
    },
    buttonNo: {
        backgroundColor: 'red', // A red color for cancellation
    },
    itemImage: {
        marginTop: 50,
        paddingTop: 100,
        paddingBottom: 50,
        width: 350,
        height: 500,
        resizeMode: 'cover',
        marginBottom: 5,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'gray',
    },
    itemTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 10,
    },
    bottomButton: {
        height: 45,
        width: 45,
        resizeMode: 'contain',
        paddingTop: 25,
        borderRadius: 0
    },
});

export default HomePage;