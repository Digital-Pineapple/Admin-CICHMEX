import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables()

const userApi = axios.create({
baseURL: "http://192.168.1.49:3001/api"
})



export default userApi;