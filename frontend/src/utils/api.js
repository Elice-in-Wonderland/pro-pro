import axios from 'axios';
import { getToken, removeState, removeToken } from './store';

export const url = process.env.SERVER_URL || 'http://localhost:4000/';

const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  config => {
    config.headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response) {
      if (
        error.response.data.message === '토큰 값이 만료되었습니다.' ||
        error.response.data.message === '유효하지 않은 토큰값입니다.'
      ) {
        alert('로그인 기간이 만료되었습니다. 다시 로그인해주세요.');
        removeToken();
        removeState('myInfo');
        window.location.reload();
      }
    }

    throw new Error(error);
  },
);

export default axiosInstance;
