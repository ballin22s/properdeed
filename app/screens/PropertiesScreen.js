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
  console.log(state);
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
              <Text style={styles.company_name}>
                {property.investment_type}  
              </Text>
              <Text style={styles.company_name}>
                {property.name}  
              </Text>
              <Text style={styles.company_name}>
                {property.property_type}  
              </Text>
              <Text style={styles.company_name}>
                {property.property_address.street1} {property.property_address.street2}
                {property.property_address.city} {property.property_address.state_id} {property.property_address.zip}
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
  company_name: {
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
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#0077cc',
  },
  button: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  }
});

export default PropertiesScreen;
