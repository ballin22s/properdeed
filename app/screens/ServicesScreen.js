import React, { useContext } from 'react';
import { 
  StyleSheet,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground 
} from 'react-native';

import { NavigationEvents, withNavigationFocus } from 'react-navigation';
import { Context as ServiceContext } from '../context/ServiceContext';
import { ListItem } from 'react-native-elements';

import { Dimensions } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const image = { uri: "https://docs.expo.dev/static/images/tutorial/splash.png" };

const ServicesScreen = ({ navigation }) => {
  const { state, fetchServices } = useContext(ServiceContext);

  return (    
    <>
    <NavigationEvents onWillFocus={fetchServices} />
     <ScrollView>
       <View style={styles.container}>
        {state.map(function(service, index){
          return (
            <TouchableWithoutFeedback
              onPress={(name) => navigation.navigate('Vendors', { name: service.name })} key={index}
            >
            <View style={styles.service}>
              <ImageBackground style={styles.image} imageStyle={{ borderRadius: 20 }}>
                <Text style={styles.text}>{service.name}</Text>
              </ImageBackground>
            </View>
            </TouchableWithoutFeedback>
          );
        })}
       </View>
     </ScrollView>
    </>
  );
};

ServicesScreen.navigationOptions = ({ navigation }) => ({
  title: 'Services',
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
    marginTop: 10,
    marginHorizontal: 5,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: "#f8f8ff",
  },
  service: {
    backgroundColor: "#000",
    borderRadius: 20,
    margin: 5,
    width: '47%',
    height: (Dimensions.get('window').width / 2) - (Dimensions.get('window').width*.03),
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  text: {
    color: 'black',
    textAlign: 'center',
    backgroundColor: "white",
    margin: 5,
  },
});

export default withNavigationFocus(ServicesScreen);
