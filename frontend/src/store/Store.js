/* eslint-disable no-continue */
import { observable } from './observe';

// eslint-disable-next-line import/prefer-default-export
export const createStore = reducer => {
  const state = observable(reducer());

  const frozenState = {};
  Object.keys(state).forEach(key => {
    Object.defineProperty(frozenState, key, {
      get: () => state[key],
    });
  });

  const dispatch = action => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      if (!state[key]) continue;
      state[key] = value;
    }
  };

  const getState = () => frozenState;

  return { getState, dispatch };
};
