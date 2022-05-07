import { getToken } from '../utils/auth';

const getPathname = () => {
  return window.location.pathname;
};

const getQuery = () => {
  const { search } = window.location;
  const queries = new URLSearchParams(search);
  const params = {};
  queries.forEach((value, propName) => {
    params[propName] = value;
  });
  return params;
};

const loginValidation = isRequired => {
  let isPass = true;

  const token = getToken();
  const loginState = token !== undefined; // getLoginState()
  if (isRequired) isPass = loginState;

  return isPass;
};

export { getPathname, getQuery, loginValidation };
