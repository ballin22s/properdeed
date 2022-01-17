import React, { useContext, useState } from 'react';

import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Context as VendorContext } from '../context/VendorContext';
import VendorForm from '../components/VendorForm';

const VendorFormScreen = ({ navigation }) => {
  const { state, createVendor, clearErrorMessage } = useContext(VendorContext);
  
  const service = navigation.getParam('name');
          
  return (
    <ScrollView>
      <View style={styles.container}>
        <NavigationEvents onWillFocus={ clearErrorMessage }/>
        <VendorForm
          errorMessage={state.errorMessage}
          onSubmit={createVendor}
          serviceName={service}
          submitButtonText="Create Vendor"
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
