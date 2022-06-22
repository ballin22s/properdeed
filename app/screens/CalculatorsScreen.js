import React, { useContext } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation';

const CalculatorsScreen = ({ navigation }) => {
  return (
  <View style={styles.container}>
    <Button
      title="Logout"
    />
  </View>
  );
};

CalculatorsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Calculators'
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200
  }
});

export default CalculatorsScreen;
