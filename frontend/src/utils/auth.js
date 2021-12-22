import Cookies from 'js-cookie';
import axiosInstance from './api';
import { state, setState } from './store';

function getToken() {
  const token = Cookies.get('AG3_JWT');
  return token;
}

function removeToken() {
  Cookies.remove('AG3_JWT');
}

async function getMyInfo() {
  const token = getToken();
  if (token && !state.myInfo) {
    const { data } = await axiosInstance('/users', { withCredentials: true });
    const myInfo = data.data;
    setState('myInfo', myInfo);
  }
}

export default { getToken, getMyInfo, removeToken };
