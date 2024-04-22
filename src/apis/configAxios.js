import axios from 'axios';


export const instanceApi = axios.create({
  baseURL: "https://api.carwashymas.com/api",
  responseType: 'json',
  headers: {
    "token": localStorage.getItem('token') || ''
  }
});