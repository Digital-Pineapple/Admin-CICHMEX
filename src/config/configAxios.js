import axios from 'axios';
import Cookies from 'js-cookie';

export const instanceApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  responseType: 'json'
});

axios.interceptors.request.use(function (config) {
  config.headers.token = Cookies.get('session') || '';
  return config;
});