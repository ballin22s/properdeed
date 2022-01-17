import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_services':
      return action.payload;
    default:
      return state;
  }
};

const fetchServices = dispatch => async() => {
  const response = await trackerApi.get('/services');
  dispatch({ type: 'fetch_services', payload: response.data });
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchServices },
  []
);
