import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';

import { withNavigation } from 'react-navigation';

const DeleteForm = ({ errorMessage, onSubmit, serviceName, deleteObject, submitButtonText, navigation }) => {

  const [ID, setID] = useState(deleteObject ? deleteObject.id : null);

  const deleteAlert = (ID) =>  
    Alert.alert(
      "Do you want to delete this?",
      "You cannot undo this action",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "Delete",
          onPress: () => onSubmit({ID}),
          style: "destructive"
        }
      ]
    );
  
  return (
    <>
      <Spacer>
        <TouchableOpacity
          style={deleteObject ? styles.button : styles.hidden }
          onPress={() => deleteAlert(ID)}   
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
