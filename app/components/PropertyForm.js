import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, View, Input, Picker } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import Spacer from '../components/Spacer';

import PhoneInput from 'react-phone-number-input/react-native-input'

import { withNavigation } from 'react-navigation';

const PropertyForm = ({ errorMessage, onSubmit, property, submitButtonText, navigation }) => {

  const [propertyID, setPropertyID] = useState(property ? property.id : null);
  
  const [open2, setPropertyTypeOpen] = useState(false);  
  const [propertyTypeValue, setPropertyTypeValue] = useState(property ? property.property_type : null);
  const [propertyTypes, setPropertyTypes] = useState([
    { value: 1, label: "Apartment" },
    { value: 2, label: "Single Family Residence" },
    { value: 3, label: "Condominium" },
    { value: 4, label: "Townhouse" },
    { value: 5, label: "Mobile/Manufactured Home" }
  ]);
  
  const [open3, setInvestmentTypeOpen] = useState(false);  
  const [investmentTypeValue, setInvestmentTypeValue] = useState(property ? property.investment_type : null);
  const [investmentTypes, setInvestmentTypes] = useState([
    { value: 1, label: "Long-Term Rentals" },
    { value: 2, label: "Short-Term Rentals" }
  ]);
  
  const [propertyName, setPropertyName] = useState(property ? property.name : '');
  
  const [street1, setStreet1] = useState(property?.property_address ? property.property_address.street1 : '');
  const [street2, setStreet2] = useState(property?.property_address ? property.property_address.street2 : '');
  const [zip, setZip] = useState(property?.property_address ? property.property_address.zip : '');
  const [city, setCity] = useState(property?.property_address ? property.property_address.city : '');

  const [open1, setStateOpen] = useState(false);
  const [stateValue, setValue] = useState(property?.property_address ? property.property_address.state_id : null);

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

  const [multiUnit, setMultiUnit] = useState(property ? property.multi_unit : '');

  return (
    <>
      <Spacer/>
      <Input
        placeholder="Name"
        value={propertyName}
        onChangeText={setPropertyName}
        autoCorrect={false}
      />
      <DropDownPicker
        open={open3}
        setOpen={setInvestmentTypeOpen}
        items={investmentTypes}
        setItems={setInvestmentTypes}
        value={investmentTypeValue}
        setValue={setInvestmentTypeValue}
        placeholder="Select a Investment Type"
        dropDownDirection="TOP"
        containerStyle={{
          width: '95%',
          marginLeft: 10,
          marginBottom: 20
        }}
      />
      <DropDownPicker
        open={open2}
        setOpen={setPropertyTypeOpen}
        value={propertyTypeValue}
        setValue={setPropertyTypeValue}
        items={propertyTypes}
        setItems={setPropertyTypes}
        placeholder="Select a Property Type"
        dropDownDirection="BOTTOM"
        containerStyle={{
          width: '95%',
          marginLeft: 10,
          marginBottom: 20
        }}
      />
      <Input
        placeholder="Street 1"
        value={street1}
        onChangeText={setStreet1}
        autoCorrect={false}
      />
      <Input
        placeholder="Street 2"
        value={street2}
        onChangeText={setStreet2}
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
          marginBottom: 20
        }}
      />
      { {errorMessage} ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null }
      <Spacer>
        <Button
        title={submitButtonText}
        onPress={
          () => onSubmit({
            propertyID,
            propertyTypeValue,
            investmentTypeValue,
            propertyName,
            multiUnit,
            city,
            zip,
            stateValue,
            street1,
            street2
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

export default withNavigation(PropertyForm);
