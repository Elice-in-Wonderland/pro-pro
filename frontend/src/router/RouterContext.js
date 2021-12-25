import { getPathname, getQuery } from './utils';

class RouterContext {
  constructor() {
    this.state = {
      pathname: getPathname(),
      query: getQuery(),
      params: {},
      push: () => {},
      replace: () => {},
      goBack: () => {},
      reload: () => {},
    };
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
  }
}

export default new RouterContext();
