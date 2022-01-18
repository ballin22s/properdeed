import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Text, Button, View } from 'react-native-elements';
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
        <Button 
        title={submitButtonText}
        onPress={() => deleteAlert(vendorID)}   
        />
      </Spacer>
    </>
  )
}

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 10,
    marginBottom: 5
  }
});

export default withNavigation(DeleteForm);
