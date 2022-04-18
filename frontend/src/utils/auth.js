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

function getMyInfo() {
  return new Promise((resolve, reject) => {
    const token = getToken();

    if (token && !state.myInfo) {
      axiosInstance('/users', { withCredentials: true })
        .then(res => {
          const myInfo = res?.data?.data;
          if (myInfo) setState('myInfo', myInfo);
          resolve();
        })
        .then(err => reject(err));
    } else {
      resolve();
    }
  });
}

function restructingMyInfo(info) {
  const { _id, nickname, position, stacks, imageURL, sido, sigungu } = info;
  const myInfo = {
    _id,
    nickname,
    position,
    stacks,
    imageURL,
    region: {
      sido,
      sigungu,
    },
    bookmarks: [],
  };

  return myInfo;
}

export { getToken, getMyInfo, restructingMyInfo, removeToken };
