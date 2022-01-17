import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, View, Input, Picker } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import Spacer from '../components/Spacer';

import { withNavigation } from 'react-navigation';

const VendorForm = ({ errorMessage, onSubmit, serviceName, submitButtonText, navigation }) => {
  const [companyName, setCompanyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
    
  const [open1, setStateOpen] = useState(false);
  const [stateValue, setValue] = useState(null);
    
  const [usStates, setUsStates] = useState([
    { value: 2, label: "Alabama" },
    { value: 1, label: "Alaska" },
    { value: 4, label: "Arizona" },
    { value: 3, label: "Arkansas" },
    { value: 5, label: "California" },
    { value: 6, label: "Colorado" },
    { value: 7, label: "Connecticut" },
    { value: 9, label: "Delaware" },
    { value: 8, label: "District of Columbia" },
    { value: 10, label: "Florida" },
    { value: 11, label: "Georgia" },
    { value: 12, label: "Hawaii" },
    { value: 14, label: "Idaho" },
    { value: 15, label: "Illinois" },
    { value: 16, label: "Indiana" },
    { value: 13, label: "Iowa" },
    { value: 17, label: "Kansas" },
    { value: 18, label: "Kentucky" },
    { value: 19, label: "Louisiana" },
    { value: 22, label: "Maine" },
    { value: 21, label: "Maryland" },
    { value: 20, label: "Massachusetts" },
    { value: 23, label: "Michigan" },
    { value: 24, label: "Minnesota" },
    { value: 26, label: "Mississippi" },
    { value: 25, label: "Missouri" },
    { value: 27, label: "Montana" },
    { value: 30, label: "Nebraska" },
    { value: 34, label: "Nevada" },
    { value: 31, label: "New Hampshire" },
    { value: 32, label: "New Jersey" },
    { value: 33, label: "New Mexico" },
    { value: 35, label: "New York" },
    { value: 28, label: "North Carolina" },
    { value: 29, label: "North Dakota" },
    { value: 36, label: "Ohio" },
    { value: 37, label: "Oklahoma" },
    { value: 38, label: "Oregon" },
    { value: 39, label: "Pennsylvania" },
    { value: 40, label: "Rhode Island" },
    { value: 41, label: "South Carolina" },
    { value: 42, label: "South Dakota" },
    { value: 43, label: "Tennessee" },
    { value: 44, label: "Texas" },
    { value: 45, label: "Utah" },
    { value: 47, label: "Vermont" },
    { value: 46, label: "Virginia" },
    { value: 48, label: "Washington" },
    { value: 50, label: "West Virginia" },
    { value: 49, label: "Wisconsin" },
    { value: 51, label: "Wyoming" },
  ]);
  
  const [service, setService] = useState(serviceName);
  
  return (
    <>
      <Spacer/>
      <Input
        placeholder="Company Name"
        value={companyName}
        onChangeText={setCompanyName}
        autoCorrect={false}
      />
      <Input
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        autoCorrect={false}
      />
      <Input
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        autoCorrect={false}
      />
      <Input
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType={'phone-pad'}
        autoCorrect={false}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType={'email-address'}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholder="City"
        value={city}
        onChangeText={setCity}
        autoCorrect={false}
      />
      <Input
        placeholder="Zip"
        value={zip}
        keyboardType={'number-pad'}
        onChangeText={setZip}
        autoCorrect={false}
      />
      <DropDownPicker
        open={open1}
        value={stateValue}
        items={usStates}
        setOpen={setStateOpen}
        setValue={setValue}
        setItems={setUsStates}
        placeholder="Select a State"
        dropDownDirection="TOP"
        containerStyle={{
          width: '95%',
          marginLeft: 10,
        }}
      />
      { {errorMessage} ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null }
      <Spacer>
        <Button 
        title={submitButtonText} 
        onPress={
          () => onSubmit({
            companyName,
            firstName,
            lastName,
            phone,
            email,
            city,
            zip,
            stateValue,
            service
          })}
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

export default withNavigation(VendorForm);
