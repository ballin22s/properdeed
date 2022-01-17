import React, { useContext } from 'react';

import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const LoginScreen = ({ navigation }) => {
  const { state, login, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={ clearErrorMessage }/>
      <AuthForm
        headerText="Login"
        errorMessage={state.errorMessage}
        onSubmit={login}
        submitButtonText="Login"
      />
      <NavLink
        routeName="Signup"
        text="Don't have an account? Sign Up"
      />
    </View>
  );
};

LoginScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200
  }
});

export default LoginScreen;
