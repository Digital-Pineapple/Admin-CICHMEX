import axios from 'axios';


export const instanceApi = axios.create({
  baseURL: "http://localhost:3001/api",
  responseType: 'json',
  headers: {
<<<<<<< HEAD
    token : localStorage.getItem('TokenAdmin') || ''
=======
    "token": localStorage.getItem('token') || ''
>>>>>>> 51f92ccf0726bf9bcec9bee579e196ab2d6180c5
  }
});