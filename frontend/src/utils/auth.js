import Toast from '../components/Toast/Toast';
import axiosInstance from './api';
import { getToken, setState, setToken, state } from './store';

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

async function requestAutoLogin() {
  try {
    const token = getToken();

    if (token && !state.myInfo) {
      const {
        data: { data: userInfo },
      } = await axiosInstance('/users', { withCredentials: true });

      if (userInfo) setState('myInfo', userInfo);
    }
  } catch (err) {
    new Toast({
      content: '유저정보를 불러오는데 실패하였습니다.',
      type: 'fail',
    });
  }
}

async function requestLogin(user) {
  try {
    const res = await axiosInstance.post('/users', user, {
      withCredentials: true,
    });
    const { AG3_JWT } = res.data.data;
    const myInfo = restructingMyInfo(res.data.data);

    setState('myInfo', myInfo);
    setToken(AG3_JWT);
  } catch (error) {
    throw new Error(error);
  }
}

export { restructingMyInfo, requestAutoLogin, requestLogin };
