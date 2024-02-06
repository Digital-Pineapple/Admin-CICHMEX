import axios from 'axios';


export const instanceApi = axios.create({
  baseURL: "http://localhost:3001/api",
  responseType: 'json',
  headers: {
    token : localStorage.getItem('TokenAdmin') || ''
  }
});