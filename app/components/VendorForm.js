import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, View, Input, Picker } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import Spacer from '../components/Spacer';

import PhoneInput from 'react-phone-number-input/react-native-input'

import { withNavigation } from 'react-navigation';

const VendorForm = ({ errorMessage, onSubmit, serviceName, vendor, submitButtonText, navigation }) => {

  const [vendorID, setVendorID] = useState(vendor ? vendor.id : null);
  const [companyName, setCompanyName] = useState(vendor ? vendor.company_name : '');
  const [firstName, setFirstName] = useState(vendor ? vendor.first_name : '');
  const [lastName, setLastName] = useState(vendor ? vendor.last_name : '');
  const [phone, setPhone] = useState(vendor ? vendor.phone : '');
  const [email, setEmail] = useState(vendor ? vendor.email : '');
  const [website, setWebsite] = useState(vendor ? vendor.website : '');
  const [note, setNote] = useState(vendor ? vendor.note : '');
  const [zip, setZip] = useState(vendor?.vendor_address ? vendor.vendor_address.zip : '');
  const [city, setCity] = useState(vendor?.vendor_address ? vendor.vendor_address.city : '');

  const [open1, setStateOpen] = useState(false);
  const [stateValue, setValue] = useState(vendor?.vendor_address ? vendor.vendor_address.state_id : null);

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
      <PhoneInput
        style={styles.phone}
        placeholder="Phone"
        placeholderTextColor="gray"
        defaultCountry="US"
        value={phone}
        onChange={setPhone}
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
        placeholder="Website"
        value={website}
        onChangeText={setWebsite}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholder="Note"
        value={note}
        onChangeText={setNote}
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
            vendorID,
            companyName,
            firstName,
            lastName,
            phone,
            email,
            website,
            note,
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
  },
  phone: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginTop: 10
  }
});

export default withNavigation(VendorForm);
