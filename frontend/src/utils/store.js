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

export { state, setState, removeState, reset };
