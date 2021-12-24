import axios from 'axios';
import auth from './auth';

export const url = process.env.SERVER_URL || 'http://localhost:4000/';

const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*',
    Authorization: `Bearer ${auth.getToken()}`,
    Accept: 'application/json',
  },
});
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
