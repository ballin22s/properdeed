import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';

import { withNavigation } from 'react-navigation';

const DeleteForm = ({ errorMessage, onSubmit, serviceName, vendor, submitButtonText, navigation }) => {
  
  const [vendorID, setVendorID] = useState(vendor ? vendor.id : null);

  const deleteAlert = (vendorID) =>  
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
          onPress: () => onSubmit({vendorID}),
          style: "destructive"
        }
      ]
    );
  
  return (
    <>
      <Spacer>
        <TouchableOpacity
          style={vendor ? styles.button : styles.hidden }
          onPress={() => deleteAlert(vendorID)}   
        >
          <Text style={styles.text}>Delete</Text>
        </TouchableOpacity>
      </Spacer>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
  },
  hidden: {
    display: 'none',
  },
  text: {
    color: "white",
    fontSize: 18,
  }
});

export default withNavigation(DeleteForm);
