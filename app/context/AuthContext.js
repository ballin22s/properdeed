import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {  
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload }
    case 'login':
      return { errorMessage: '', token: action.payload }
    case 'clear_error_message':
      return { ...state, errorMessage: '' }
    case 'logout':
      return { token: null, errorMessage: '' }
    default:
      return state;
  };
};

const tryLocalSignin = dispatch => async () => {  
  const user = await AsyncStorage.getItem('user');
  const token = (user !== null ? JSON.parse(user)[0][1] : null);
    
  if (token) {
    dispatch({ type: 'login', payload: token });
    navigate('Services');
  } else {
    navigate('Login');
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' })
}

const signup = dispatch => async ({ email, password }) => {
  try {
    console.log(email);
    const response = await trackerApi.post('users', { user: { email, password } });
    console.log(response);
    var user = [['token', response.data.user.token], ['user_id', response.data.user.id]]
    await AsyncStorage.setItem("user", JSON.stringify(user))
    
    dispatch({ type: 'login', payload: response.data.user.token });

    navigate('Services');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up'
    });
  }
};

const login = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post(
      'users/login',
      { 
        sessions: { 
          email: email, 
          password: password,
          password_confirmation: password
        } 
      } 
    );
        
    var user = [['token', response.data.user.token], ['user_id', response.data.user.id]]
    await AsyncStorage.setItem("user", JSON.stringify(user))
    
    dispatch({ type: 'login', payload: response.data.user.token });
    navigate('Services');
    console.log("success");
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with login'
    });
  }
};

const logout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'logout' });
  navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { login, logout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
);
