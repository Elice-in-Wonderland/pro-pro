import { getToken } from '../utils/store';

const isAllowedRoute = isRequired => {
  let isAllowed = true;

  const token = getToken();
  const loginState = token !== undefined;
  if (isRequired) isAllowed = loginState;

  return isAllowed;
};

const getPathname = () => window.location.pathname;

const getQuery = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const params = {};

  for (const [propName, value] of urlParams) {
    params[propName] = value;
  }

  return params;
};

export { isAllowedRoute, getPathname, getQuery };
