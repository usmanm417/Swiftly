import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { firebase } from '../../config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const HomePage = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [itemDetails, setItemDetails] = useState({});
    const [cartData, setCartData] = useState([]);

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
        const updatedCartData = [...cartData, itemToAdd];
        setCartData(updatedCartData); // Update the local cart data state
        navigation.navigate('CartScreen', { cartData: updatedCartData }); // Pass updated cart data to CartScreen
        setIsModalVisible(false);
    };

    // Main view
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('StoreSelect')}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Scan Items Below!</Text>
            <View style={styles.barcodeBox}>
                <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.barcodeScanner} />
            </View>
            <Text style={styles.maintext}>{text}</Text>

            {scanned && (
                <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
                    <Text style={styles.buttonText}>Scan again?</Text>
                </TouchableOpacity>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image source={{ uri: itemDetails.imageUrl }} style={styles.itemImage} />
                    <Text style={styles.itemTitle}>{itemDetails.name}</Text>
                    <Text style={styles.itemDetail}>Color: {itemDetails.color}</Text>
                    <Text style={styles.itemDetail}>Description: {itemDetails.description}</Text>
                    <Text style={styles.itemDetail}>Material: {itemDetails.material}</Text>
                    <Text style={styles.itemDetail}>Size: {itemDetails.size}</Text>
                    <Text style={styles.itemDetail}>Price: ${itemDetails.price}</Text>
                    <Text style={styles.itemDetail}>Store: {itemDetails.store}</Text>
                    <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.modalButton, styles.buttonYes]}
                        onPress={() => {
                        addItemToCart()
                        }}
                    >
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.modalButton, styles.buttonNo]}
                        onPress={() => setIsModalVisible(false)}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100,
    },
    barcodeBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 350,
        width: 320,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'gray',
    },
    maintext: {
        fontSize: 16,
        margin: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 20,
    },
    header: {
        position: 'absolute',
        top: 30, 
        left: 20,
        zIndex: 1,
    },
    backButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 20,
        width: 60,
        height: 40,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
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
        width: '80%', // Set a fixed width for the modal
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
        fontSize: 16,
        marginVertical: 4,
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
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    itemTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 10,
    },
});

export default HomePage;