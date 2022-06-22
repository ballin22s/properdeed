import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Navigator from './app/routes/navigator'

import { setNavigator } from './app/navigationRef';
import { Provider as ServiceProvider } from './app/context/ServiceContext';
import { Provider as PropertyProvider } from './app/context/PropertyContext';

import { Provider as VendorProvider } from './app/context/VendorContext';

import { Provider as AuthProvider } from './app/context/AuthContext';

//import { StyleSheet, Text, View } from 'react-native';

export default () => {
  return (
    <PropertyProvider>
      <ServiceProvider>
        <VendorProvider>
          <AuthProvider>
            <Navigator
              ref={(navigator) => {
                setNavigator(navigator);
              }}
            />
          </AuthProvider>
        </VendorProvider>
      </ServiceProvider>
    </PropertyProvider>
  );
};
