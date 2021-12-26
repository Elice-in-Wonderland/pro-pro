import axios from 'axios';
import RouterContext from '../router/RouterContext';
import auth from './auth';

import { removeState } from './store';

export const url = process.env.SERVER_URL || 'http://localhost:4000/';
const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});
axiosInstance.defaults.withCredentials = true;

// api 요청시 사전에 토큰을 header에 셋팅
axiosInstance.interceptors.request.use(
  config => {
    config.headers = {
      Authorization: `Bearer ${auth.getToken()}`,
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
        auth.removeToken();
        removeState('myInfo');
        RouterContext.state.reload();
      }
    } else {
      console.error('Error Message:', error.message);
    }
  },
);

export default axiosInstance;
