import React, { useState } from 'react';
import {
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
  View,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const StoreSelect = ({navigation}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Select store & location  ▼');
  const data = ['With Jean (3500 Peachtree Rd NE)', 'Guizio (675 Ponce De Leon Ave NE)', 'Mango (3535 Peachtree Rd NE)', 'Aritzia (3393 Peachtree Rd NE)'];

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    toggleDropdown();
  };

  const handleSelectStore = () => {
    navigation.navigate('HomePage', { selectedStore: selectedItem });
  };

  return (
    <ImageBackground
      source={require("../assets/selectstore.jpeg")} // Replace with the correct path to your image
      style={styles.background}
    >
      <TouchableOpacity onPress={() => {
        console.log('Back button pressed');
        navigation.navigate('RegisterScreen');
      }} style={styles.backButton}>
        <Image source={require("../assets/backarrow.png")} style={styles.backButtonImage} />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        
        <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
          <Text style={styles.buttonText}>{selectedItem}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPressOut={() => setDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            {data.map((item, index) => (
              <TouchableOpacity
                key={item}
                onPress={() => handleSelectItem(item)}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
                {index < data.length - 1 && <View style={styles.separator} />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSelectStore} style={styles.selectStoreButton}>
          <Text style={styles.selectStoreButtonText}>Start scanning</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backButton: {
    marginTop: 50,
    position: 'absolute',
    left: -13,
    paddingLeft: 25,
  },
  backButtonImage: {
    width: 30,
    height: 30,
  },
  headerContainer: {
    flex: 1, // Use flex to adjust the size dynamically
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35,
  },
  headerText: {
    fontSize: 22,
    
    textAlign: 'center',
    marginBottom: 10,
    
    paddingBottom: 15,
  },
  dropdownButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    width: '90%',
    borderRadius: 5,
    marginTop: 300,
    alignSelf: 'center',

  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dropdownItem: {
    padding: 25,
    alignItems: 'center',
    
  },
  dropdownItemText: {
    fontSize: 19,
  },
  separator: {
    height: 0,
    backgroundColor: '#ccc',
    width: '100%',
  },
  footer: {
    flex: 0.5, // Adjust the flex value to position the footer correctly
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  selectStoreButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    width: '90%', // Use percentage for width
    borderWidth: 1,
    borderRadius: 0,
    alignItems: 'center',
  },
  selectStoreButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default StoreSelect;
