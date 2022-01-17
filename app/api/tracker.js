import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
  baseURL: 'http://192.168.0.222:5000/api/v1/'
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
