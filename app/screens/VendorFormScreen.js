import React, { useContext, useState } from 'react';

import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Context as VendorContext } from '../context/VendorContext';
import VendorForm from '../components/VendorForm';

const VendorFormScreen = ({ navigation }) => {
  const { state, createVendor, updateVendor, clearErrorMessage } = useContext(VendorContext);
  
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200
  }
});

export default VendorFormScreen;
