import React, { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import ResolveAuthScreen from '../screens/ResolveAuthScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import LogoutScreen from '../screens/LogoutScreen';

import ServicesScreen from '../screens/ServicesScreen';
import VendorsScreen from '../screens/VendorsScreen';
import VendorFormScreen from '../screens/VendorFormScreen';

import PropertiesScreen from '../screens/PropertiesScreen';
import PropertyFormScreen from '../screens/PropertyFormScreen';

import CalculatorsScreen from '../screens/CalculatorsScreen';

import { FontAwesome } from '@expo/vector-icons';

const appNavigation = createStackNavigator({
  Services: ServicesScreen,
  Logout: LogoutScreen,
  Vendors: VendorsScreen,
  VendorForm: VendorFormScreen  
});

const propertyNavigation = createStackNavigator({
  Properties: PropertiesScreen,
  PropertyForm: PropertyFormScreen,
  Logout: LogoutScreen
});

const TabNavigator = createBottomTabNavigator(
  {
    Services: appNavigation,
    Properties: propertyNavigation
    //Calculators: CalculatorsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        let iconName;
        if (routeName === 'Services') {
          iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          iconName = `body${focused ? '' : '-outline'}`;
        } else if (routeName === 'Properties') {
          iconName = `home${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    },
  }
);

appNavigation.navigationOptions = {
  title: 'Services'
};

const switchNavigator = createSwitchNavigator ({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Login: LoginScreen,
    Signup: SignupScreen
  }),
  TabNavigator: TabNavigator
});

export default createAppContainer(switchNavigator);