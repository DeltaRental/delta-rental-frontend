import  axios  from 'axios';
import tokenService from '../../../services/tokenService';
//import { store } from '../../../store/store';
import { decreaseRequestCount, increaseRequestCount } from '../../../store/slices/loadingSlice';
import { EnhancedStore } from '@reduxjs/toolkit';

let store:EnhancedStore

export const injectStore = (_store: EnhancedStore) => {
  store = _store
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/"
});

axiosInstance.interceptors.request.use(config => {
  let token = tokenService.getToken();
  if(token) config.headers.Authorization = `Bearer ${token}`;

  store.dispatch(increaseRequestCount());

  return config;
})


axiosInstance.interceptors.response.use(
  response => {
    store.dispatch(decreaseRequestCount());
    return response
  },
  error => {
    store.dispatch(decreaseRequestCount());

  },
)


export default axiosInstance;