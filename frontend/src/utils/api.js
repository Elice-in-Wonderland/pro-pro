import axios from 'axios';

const url = 'http://localhost:4000/';

const axiosInstance = axios.create({
  baseURL: url,
});

// example
// axiosInstance.get('/write') === http://localhost:4000/write
