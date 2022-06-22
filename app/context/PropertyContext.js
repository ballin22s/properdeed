import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const propertyReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_properties':
      return action.payload;
    case 'fetch_states':
      return action.payload;
    case 'createProperty':
      return { errorMessage: '', token: action.payload }
    case 'updateProperty':
      return { errorMessage: '', token: action.payload }
    case 'deleteProperty':
      return { errorMessage: '', token: action.payload }
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' })
}

const createProperty = dispatch => async ({ propertyID, propertyTypeValue, investmentTypeValue, propertyName, multiUnit, street1, street2, city, zip, stateValue }) => {
  const user = await AsyncStorage.getItem('user');
  const user_id = JSON.parse(user)[1][1];

  try {
    const response = await trackerApi.post(
      'properties',
      {
        property: {
          user_id: user_id,
          property_type: propertyTypeValue,
          investment_type: investmentTypeValue,
          name: propertyName,
          multi_unit: multiUnit,
          property_address_attributes: {
            state_id: stateValue,
            zip: zip,
            city: city,
            street1: street1,
            street2: street2
          }
        }
      }
    );

    console.log(response);
    navigate('Properties')

  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with login'
    });
  }
};

const updateProperty = dispatch => async ({ propertyID, propertyTypeValue, investmentTypeValue, propertyName, multiUnit, street1, street2, city, zip, stateValue }) => {
  const user = await AsyncStorage.getItem('user');
  const user_id = JSON.parse(user)[1][1];

  try {
    const response = await trackerApi.put(
      `/properties/${propertyID}`,
      {
        property: {
          user_id: user_id,
          property_type: propertyTypeValue,
          investment_type: investmentTypeValue,
          name: propertyName,
          multi_unit: multiUnit,
          property_address_attributes: {
            state_id: stateValue,
            zip: zip,
            city: city,
            street1: street1,
            street2: street2
          }
        }
      }
    );

    console.log(response.status);
    navigate('Properties')

  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with login'
    });
  }
};

const deleteProperty = dispatch => async ({ ID }) => {
  const user = await AsyncStorage.getItem('user');
  const user_id = JSON.parse(user)[1][1];

  try {
    const response = await trackerApi.delete(
      `/properties/${ID}`
    );

    console.log(response);
    navigate('Properties')

  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with login'
    });
  }
};

const fetchProperties = dispatch => async() => {
  const user = await AsyncStorage.getItem('user');
  const user_id = JSON.parse(user)[1][1];

  const response = await trackerApi.get(`/properties?user_id=${user_id}`);
  dispatch({ type: 'fetch_properties', payload: response.data });
};

const fetchStates = dispatch => async() => {
  const response = await trackerApi.get('/states');
  dispatch({ type: 'fetch_states', payload: response.data });
};

export const { Provider, Context } = createDataContext(
  propertyReducer,
  { fetchProperties, fetchStates, createProperty, updateProperty, deleteProperty, clearErrorMessage },
  []
);
