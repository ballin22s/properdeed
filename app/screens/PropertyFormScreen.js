import React, { useContext, useState } from 'react';

import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { NavigationEvents, withNavigationFocus } from 'react-navigation';

import { Context as PropertyContext } from '../context/PropertyContext';
import PropertyForm from '../components/PropertyForm';
import DeleteForm from '../components/DeleteForm';

import { FontAwesome } from '@expo/vector-icons';

const PropertyFormScreen = ({ navigation, onSubmit }) => {
  const { state, createProperty, updateProperty, deleteProperty, clearErrorMessage } = useContext(PropertyContext);

  const property = navigation.getParam('property');

  return (
    <ScrollView>
      <View style={styles.container}>
        <NavigationEvents onWillFocus={ clearErrorMessage }/>
        <PropertyForm
          errorMessage={state.errorMessage}
          onSubmit={property ? updateProperty : createProperty}
          property={property}
          submitButtonText={property ? "Update Property" : "Create Property"}
        />
        <DeleteForm
          errorMessage={state.errorMessage}
          onSubmit={deleteProperty}
          deleteObject={property}
          submitButtonText={"Delete"}
        />
      </View>
    </ScrollView>
  );
};

PropertyFormScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('property') ? "Edit" : "Create"
  //headerRight: navigation.getParam('vendor') ? <FontAwesome onPress={deleteAlert} name="trash" size={20} style={{ marginRight: 10 }} />  : null,
});

const deleteAlert = ({ navigation, onSubmit }) => {
  Alert.alert(
    "Do you want to delete this property?",
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

export default PropertyFormScreen;
