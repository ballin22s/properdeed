import React, { useContext } from 'react';
import { 
  StyleSheet,
  Text,
  ScrollView,
  View,
  Dimensions,
  Linking,
  TouchableOpacity,
  Platform,
  Button,
} from 'react-native';

import { NavigationEvents, withNavigationFocus } from 'react-navigation';

import { Context as PropertyContext } from '../context/PropertyContext';

import { FontAwesome } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PropertiesScreen = ({ navigation }) => {
  const { state, fetchProperties, clearErrorMessage } = useContext(PropertyContext);

  const property_types = ["Apartment", "Single Family Residence", "Condominium", "Townhouse", "Mobile/Manufactured Home"]
  
  const states = [
    { id: 2, label: "Alabama" },
    { id: 1, label: "Alaska" },
    { id: 4, label: "Arizona" },
    { id: 3, label: "Arkansas" },
    { id: 5, label: "California" },
    { id: 6, label: "Colorado" },
    { id: 7, label: "Connecticut" },
    { id: 9, label: "Delaware" },
    { id: 8, label: "District of Columbia" },
    { id: 10, label: "Florida" },
    { id: 11, label: "Georgia" },
    { id: 12, label: "Hawaii" },
    { id: 14, label: "Idaho" },
    { id: 15, label: "Illinois" },
    { id: 16, label: "Indiana" },
    { id: 13, label: "Iowa" },
    { id: 17, label: "Kansas" },
    { id: 18, label: "Kentucky" },
    { id: 19, label: "Louisiana" },
    { id: 22, label: "Maine" },
    { id: 21, label: "Maryland" },
    { id: 20, label: "Massachusetts" },
    { id: 23, label: "Michigan" },
    { id: 24, label: "Minnesota" },
    { id: 26, label: "Mississippi" },
    { id: 25, label: "Missouri" },
    { id: 27, label: "Montana" },
    { id: 30, label: "Nebraska" },
    { id: 34, label: "Nevada" },
    { id: 31, label: "New Hampshire" },
    { id: 32, label: "New Jersey" },
    { id: 33, label: "New Mexico" },
    { id: 35, label: "New York" },
    { id: 28, label: "North Carolina" },
    { id: 29, label: "North Dakota" },
    { id: 36, label: "Ohio" },
    { id: 37, label: "Oklahoma" },
    { id: 38, label: "Oregon" },
    { id: 39, label: "Pennsylvania" },
    { id: 40, label: "Rhode Island" },
    { id: 41, label: "South Carolina" },
    { id: 42, label: "South Dakota" },
    { id: 43, label: "Tennessee" },
    { id: 44, label: "Texas" },
    { id: 45, label: "Utah" },
    { id: 47, label: "Vermont" },
    { id: 46, label: "Virginia" },
    { id: 48, label: "Washington" },
    { id: 50, label: "West Virginia" },
    { id: 49, label: "Wisconsin" },
    { id: 51, label: "Wyoming" },
  ]
  
  const state_abbr = (ID) => {
    var found = states.find(obj => {
      return obj.id === ID;
    });
    return found.label;
  }
  
  return (
    <>
    <NavigationEvents onWillFocus={fetchProperties} />    
     <ScrollView>
       <View style={styles.container}>
        {state.map(function(property, index){
          return (
            <View style={styles.property} key={index}>
              <FontAwesome
                onPress={() => navigation.navigate('PropertyForm', { property: property })} key={index}            
                name="edit"
                size={20}
                style={{ textAlign: "right", marginRight: 25 }}
              />
              <Text style={styles.name}>
                {property.name}  
              </Text> 
              <Text style={styles.property_type}>
                {property_types[property.property_type-1]}
              </Text>
              <Text style={styles.property_type}>
                {property.investment_type == 1 ? 'Long-Term Rentals' : 'Short-Term Rentals'}  
              </Text>  
              <Text style={styles.text}>
                {property.property_address.street1} {property.property_address.street2} {'\n'} 
                {property.property_address.city} {state_abbr(property.property_address.state_id)} {property.property_address.zip}
              </Text>
            </View>
          );
        })}
       </View>
     </ScrollView>
    </>
  );
};

PropertiesScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('name'),
  headerRight: () => (
    <FontAwesome
      onPress={() => navigation.navigate('PropertyForm', navigation.state.params)}
      name="plus"
      size={20}
      style={{ marginRight: 10 }}
    />
  ),
  headerLeft: () => (
    <FontAwesome
      onPress={() => navigation.navigate('Logout')}
      name="bars"
      size={20}
      style={{ marginLeft: 10 }}
    />
  ),
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginHorizontal: 5,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: "#f8f8ff",
  },
  property: {
    textAlign: 'center',
    justifyContent: 'center',
    textAlignVertical: "center",
    backgroundColor: "#fff",
    margin: 7,
    width: '97%',
    height: (Dimensions.get('window').width / 2) - (Dimensions.get('window').width*.03),
  
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  property_type: {
    color: 'gray',
    fontSize: 15,
    fontWeight: "bold",
    textAlign: 'center',
    margin: 5,
  },
  name: {
    color: 'black',
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#0077cc',
    marginTop: 5,
    color: 'red'
  },
  button: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  }
});

export default PropertiesScreen;
