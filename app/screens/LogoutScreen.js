import React, { useContext } from 'react';

import { View, StyleSheet, Button, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Context as AuthContext } from '../context/AuthContext';

const LogoutScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  
  const deleteAlert = () =>
    Alert.alert(
      "Are you sure you want to Logout?",
      '',
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "Yes",
          onPress: logout,
          style: "destructive"
        }
      ]
    );

  return (
  <View style={styles.container}>
    <Button
      title="Logout"
      onPress={deleteAlert}           
    />
  </View>
  );
};

LogoutScreen.navigationOptions = ({ navigation }) => ({
  title: 'Logout'
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200
  }
});

export default LogoutScreen;
