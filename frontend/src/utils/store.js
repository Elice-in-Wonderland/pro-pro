const GLOBAL_STATE_KEY = 'pro-pro-state';

const initState = {
  login: null,
};

const savedStateJson = localStorage.getItem(GLOBAL_STATE_KEY);

const state = savedStateJson ? JSON.parse(savedStateJson) : initState;

function setState(key, value) {
  state[key] = JSON.parse(JSON.stringify(value));
  localStorage.setItem(GLOBAL_STATE_KEY, JSON.stringify(state));
}

function removeState(key) {
  delete state[key];
  localStorage.setItem(GLOBAL_STATE_KEY);
}

function reset() {
  localStorage.removeItem(GLOBAL_STATE_KEY);
  location.reload();
}

export default {
  state,
  setState,
  removeState,
  reset,
};
