import React, { useContext, useState } from 'react';

import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { NavigationEvents, withNavigationFocus } from 'react-navigation';

import { Context as VendorContext } from '../context/VendorContext';
import VendorForm from '../components/VendorForm';
import DeleteForm from '../components/DeleteForm';

import { FontAwesome } from '@expo/vector-icons';

const VendorFormScreen = ({ navigation, onSubmit }) => {
  const { state, createVendor, updateVendor, deleteVendor, clearErrorMessage } = useContext(VendorContext);
  
  const service = navigation.getParam('name');
  const vendor = navigation.getParam('vendor');

  return (
    <ScrollView>
      <View style={styles.container}>
        <NavigationEvents onWillFocus={ clearErrorMessage }/>
        <VendorForm
          errorMessage={state.errorMessage}
          onSubmit={vendor ? updateVendor : createVendor}
          serviceName={service}
          vendor={vendor}
          submitButtonText={vendor ? "Update Vendor" : "Create Vendor"}
        />
        <DeleteForm
          errorMessage={state.errorMessage}
          onSubmit={deleteVendor}
          serviceName={service}
          vendor={vendor}
          submitButtonText={"Delete"}
        />
      </View>
    </ScrollView>
  );
};

VendorFormScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('vendor') ? "Edit" : "Create"
  //headerRight: navigation.getParam('vendor') ? <FontAwesome onPress={deleteAlert} name="trash" size={20} style={{ marginRight: 10 }} />  : null,
});

const deleteAlert = ({ navigation, onSubmit }) => {  
  Alert.alert(
    "Do you want to delete this vendor?",
    "You cannot undo this action",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { 
        text: "Delete",
        onPress: () => console.log("Cancel Pressed"),
        style: "destructive"
      }
    ]
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200
  },
  delete: {
    color: 'red'
  }
});

export default VendorFormScreen;
