import axios from 'axios';


export const instanceApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  responseType: 'json',
  headers: {
    "token": localStorage.getItem('token') || ''
  }
});