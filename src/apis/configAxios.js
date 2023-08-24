import axios from 'axios';
import Cookies from 'js-cookie';


export const instanceApi = axios.create({
  baseURL: "http://192.168.1.3:3001/api",
  responseType: 'json',
  headers: {
    "token": Cookies.get('session') || ''
  }
});