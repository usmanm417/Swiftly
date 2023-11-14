import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const settingsOptions = [
  { title: 'Personal Information', icon: 'user' },
  { title: 'Saved Payment Methods', icon: 'credit-card' },
  { title: 'Purchase History', icon: 'history' },
  { title: 'Wishlist', icon: 'heart' },
  { title: 'Settings', icon: 'cog' },
  { title: 'Help', icon: 'question-circle' },
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
      onPress={() => navigation.navigate(item.title)}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <FlatList
      data={settingsOptions}
      renderItem={renderItem}
      keyExtractor={item => item.title}
      ItemSeparatorComponent={ItemSeparator}
    />
    </SafeAreaView>
    
    
  );
};

const styles = StyleSheet.create({
headerContainer: {
    padding: 20, 
    marginTop: 20, 
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
});

export default UserProfileScreen;
