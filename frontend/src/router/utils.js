const getPathname = () => {
  return window.location.pathname;
};

const getQuery = () => {
  const { search } = window.location;
  const queries = new URLSearchParams(search);
  const params = {};
  queries.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

const pathValidation = (currentPath, routePath) => {
  if (currentPath.length !== routePath.length) return false;
  const params = {};
  let index = 0;
  for (index = 0; index < currentPath.length; index += 1) {
    if (/^:/.test(routePath[index])) {
      params[routePath[index].slice(1)] = currentPath[index];
      continue;
    }
    if (currentPath[index] !== routePath[index]) {
      return false;
    }
  }
  return params;
};

const loginValidation = isRequired => {
  let isPass = true;
  // TODO: 로그인 상태관련 관리
  const loginState = true; // getLoginState()
  if (isRequired) isPass = loginState;

  return isPass;
};

export { getPathname, getQuery, pathValidation, loginValidation };
