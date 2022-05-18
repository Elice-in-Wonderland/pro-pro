import { createStore } from './Store';
import { recentSort } from '../utils/filter';

const initState = {
  totalData: [],
  basisData: [],
  post: [],
  sortStandard: recentSort,
  filterStacks: [],
  loginState: [],
};

export const SET_POST = 'SET_POST';
export const SET_BASIS = 'SET_BASIS';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_SORT = 'SET_SORT';
export const SET_FILTER = 'SET_FILTER';
export const LOGIN_STATE = 'LOGIN_STATE';

export const store = createStore((state = initState, action = {}) => {
  switch (action.type) {
    case 'SET_POST':
      return { ...state, post: action.payload };
    case 'SET_BASIS':
      return { ...state, basisData: action.payload };
    case 'SET_TOTAL':
      return { ...state, totalData: action.payload };
    case 'SET_SORT':
      return { ...state, sortStandard: action.payload };
    case 'SET_FILTER':
      return { ...state, filterStacks: action.payload };
    case 'LOGIN_STATE':
      return { ...state, loginState: action.payload };
    default:
      return state;
  }
});

export const setPost = payload => ({ type: SET_POST, payload });
export const setBasis = payload => ({ type: SET_BASIS, payload });
export const setTotal = payload => ({ type: SET_TOTAL, payload });
export const setSort = payload => ({ type: SET_SORT, payload });
export const setFilter = payload => ({ type: SET_FILTER, payload });
export const setLoginState = payload => ({ type: LOGIN_STATE, payload });
