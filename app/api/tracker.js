import axios from 'axios';
import { AsyncStorage } from 'react-native';

const url = (__DEV__ ? 'http://192.168.0.12:5000/api/v1/' : 'https://properdeed-api.herokuapp.com/api/v1/');

const instance = axios.create({
  baseURL: url
});

instance.interceptors.request.use(
  async (config) => {
    const user = await AsyncStorage.getItem('user');
    const token = (user !== null ? JSON.parse(user)[0][1] : null);    
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
