import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const settingsOptions = [
  { title: 'Personal Information', icon: 'user', target: 'PersonalInfoScreen' },
  { title: 'Saved Payment Methods', icon: 'credit-card', target: 'PaymentMethodScreen' },
  { title: 'Purchase History', icon: 'history', target: 'PurchaseHistoryScreen' },
];

let Profile = "Profile";

const ItemSeparator = () => { 
  return <View style={styles.separator} />;
} 

const SettingsItem = ({ title, iconName, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Icon name={iconName} size={20} style={styles.icon} />
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const UserProfileScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <SettingsItem
      title={item.title}
      iconName={item.icon}
      onPress={() => navigation.navigate(item.target)}
    />
);

return (
  <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('StoreSelect')}>
      <Image source={require("../assets/backarrow.png")} style={styles.backButton} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <FlatList
        data={settingsOptions}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        ItemSeparatorComponent={ItemSeparator}
      />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20, 
    marginTop: 45, 
    alignItems: 'center', 
    },
    headerTitle: {
    fontSize: 24, // Adjust font size as needed
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
  },
  icon: {
    width: 30, // Ensure the icon has a set width for alignment
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
  line: {
    backgroundColor: 'gray',
    height: 1,
    width: '100%',
    position: 'absolute',
    bottom: 120, // Adjust this value based on the height of your button container
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
    resizeMode: 'stretch',
},
bottomButton: {
  height: 45,
  width: 45,
  resizeMode: 'contain',
  paddingTop: 25,
  borderRadius: 0
}
});

export default UserProfileScreen;
