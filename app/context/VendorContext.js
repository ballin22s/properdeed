import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const vendorReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_vendors':
      return action.payload;
    case 'fetch_states':
      return action.payload;
    case 'createVendor':
      return { errorMessage: '', token: action.payload }
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' })
}

const createVendor = dispatch => async ({ companyName, firstName, lastName, phone, email, city, zip, stateValue, service }) => {
  const user = await AsyncStorage.getItem('user');
  const user_id = JSON.parse(user)[1][1];
  
  try {
    const response = await trackerApi.post(
      'vendors',
      { 
        vendor: {
          user_id: user_id,
          company_name: companyName,
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          email: email, 
          all_services: service,
          vendor_addresses_attributes: [{
            state_id: stateValue,
            zip: zip,
            city: city
          }]
        } 
      } 
    );
    //await AsyncStorage.setItem('token', response.data.user.token);
    //dispatch({ type: 'login', payload: response.data.user.token });
    //navigate('Services');
    console.log("success");
    console.log(response);
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with login'
    });
  }
};

const fetchVendors = dispatch => async({ state }) => {
  const name = state.params.name;
  const response = await trackerApi.get(`/vendors?tag=${name}`);
  dispatch({ type: 'fetch_vendors', payload: response.data });
};

const fetchStates = dispatch => async() => {
  const response = await trackerApi.get('/states');
  dispatch({ type: 'fetch_states', payload: response.data });
};

export const { Provider, Context } = createDataContext(
  vendorReducer,
  { fetchVendors, fetchStates, createVendor, clearErrorMessage },
  []
);