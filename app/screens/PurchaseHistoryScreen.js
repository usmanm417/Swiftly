import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { usePurchaseHistory } from './PurchaseHistoryContext';

const PurchaseHistoryScreen = ({navigation}) => {
  const { purchaseHistory } = usePurchaseHistory();
  const [selectedPurchaseIndex, setSelectedPurchaseIndex] = useState(null);

  const togglePurchase = index => {
    setSelectedPurchaseIndex(index === selectedPurchaseIndex ? null : index);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('UserProfileScreen')}>
      <Image source={require("../assets/backarrow.png")} style={styles.backButton} />
      </TouchableOpacity>

      <Text style={styles.title}>Purchase History</Text>
      <ScrollView>
        {purchaseHistory.map((purchase, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.purchaseItem} 
            onPress={() => togglePurchase(index)}
          >
            <Text style={styles.dateText}>{purchase.date.toDateString()}</Text>
            {selectedPurchaseIndex === index && (
              <>
                <View style={styles.itemList}>
                  {purchase.items.map((item, idx) => (
                    <Text key={idx} style={styles.itemDetail}>
                      {item.item} - Qty: {item.quantity}
                    </Text>
                  ))}
                </View>
                <QRCode
                  value={JSON.stringify(purchase.items)}
                  size={200}
                  backgroundColor='white'
                  color='black'
                />
              </>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

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
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100, // Increased top padding
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  purchaseItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  dateText: {
    fontWeight: 'bold',
  },
  itemList: {
    marginTop: 10,
  },
  itemDetail: {
    paddingLeft: 10,
    fontSize: 16,
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
  button: {
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
  },
  backButton: {
    position: 'absolute',
        top: 20,
        left: 10,
        padding: 10,
        width: 35,
        height: 35,
        resizeMode: 'stretch',},
        bottomButton: {
          height: 45,
          width: 45,
          resizeMode: 'contain',
          paddingTop: 25,
          borderRadius: 0
        },
        line: {
          backgroundColor: 'gray',
          height: 1,
          width: '120%',
          position: 'absolute',
          bottom: 120, // Adjust this value based on the height of your button container
        },

});

export default PurchaseHistoryScreen;
