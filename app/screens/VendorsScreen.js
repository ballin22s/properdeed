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

import { Context as VendorContext } from '../context/VendorContext';

import { FontAwesome } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const VendorsScreen = ({ navigation }) => {
  const { state, fetchVendors, clearErrorMessage } = useContext(VendorContext);

  return (
    <>
    <NavigationEvents onWillFocus={fetchVendors} />    
     <ScrollView>
       <View style={styles.container}>
        {state.map(function(vendor, index){
          return (
            <View style={styles.vendor} key={index}>
              <FontAwesome
                onPress={() => navigation.navigate('VendorForm', { vendor: vendor })} key={index}            
                name="edit"
                size={20}
                style={{ textAlign: "right", marginRight: 25 }}
              />
              
              <Text style={styles.company_name}>
                {vendor.company_name}  
              </Text>
                
              <Text style={styles.name}>
                {vendor.first_name} {vendor.last_name}
              </Text>
                
              <TouchableOpacity
                style={styles.button}
                onPress={() => Linking.openURL(`tel:${vendor.phone}`) } 
              >
                <Text style={styles.text}>
                  {vendor.phone}
                </Text>
              </TouchableOpacity>
                  
              <TouchableOpacity
                style={styles.button}
                onPress={() => Linking.openURL(`mailto:${vendor.email}`) } 
              >
                <Text style={styles.text}>
                  {vendor.email}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
       </View>
     </ScrollView>
    </>
  );
};

VendorsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Vendors',
  headerRight: () => (
    <FontAwesome
      onPress={() => navigation.navigate('VendorForm', navigation.state.params)}
      name="plus"
      size={20}
      style={{ marginRight: 10 }}
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
  vendor: {
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

export default VendorsScreen;
