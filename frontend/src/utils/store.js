import Cookies from 'js-cookie';

const GLOBAL_STATE_KEY = 'pro-pro-state';

const savedStateJson = localStorage.getItem(GLOBAL_STATE_KEY);

const state = savedStateJson ? JSON.parse(savedStateJson) : {};

function setState(key, value) {
  if (key !== '' || value) {
    state[key] = JSON.parse(JSON.stringify(value));
    localStorage.setItem(GLOBAL_STATE_KEY, JSON.stringify(state));
  }
}

function removeState(key) {
  if (Object.keys(state).length !== 0) {
    const { [key]: deletedKey, ...newState } = state;
    localStorage.setItem(GLOBAL_STATE_KEY, JSON.stringify(newState));
  }
}

function reset() {
  localStorage.removeItem(GLOBAL_STATE_KEY);
}

function getToken() {
  const token = Cookies.get('AG3_JWT');
  return token;
}

function setToken(token) {
  Cookies.set('AG3_JWT', token);
}

function removeToken() {
  Cookies.remove('AG3_JWT');
}

export { state, setState, removeState, reset, getToken, setToken, removeToken };
