import axios from 'axios';


export const instanceApi = axios.create({
  baseURL: "http://localhost:3000/api",
  responseType: 'json',
  headers: {
    "token": localStorage.getItem('token') || ''
  }
});