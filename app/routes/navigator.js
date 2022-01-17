import React, { useContext } from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import ResolveAuthScreen from '../screens/ResolveAuthScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

import ServicesScreen from '../screens/ServicesScreen';
import VendorsScreen from '../screens/VendorsScreen';
import VendorFormScreen from '../screens/VendorFormScreen';

import { FontAwesome } from '@expo/vector-icons';

const appNavigation = createStackNavigator({
  Services: ServicesScreen,
  Vendors: VendorsScreen,
  VendorForm: VendorFormScreen,
});

appNavigation.navigationOptions = {
  title: 'Services'
};

const switchNavigator = createSwitchNavigator ({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Login: LoginScreen,
    Signup: SignupScreen
  }),
  appNavigation: appNavigation,
});

export default createAppContainer(switchNavigator);