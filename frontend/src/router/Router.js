import RouterContext from './RouterContext';
import {
  getPathname,
  getQuery,
  pathValidation,
  loginValidation,
} from './utils';
import { state } from '../utils/store';
import auth from '../utils/auth';

class Router {
  constructor(target, routes, NotFoundPage, Navigation) {
    this.target = target;
    this.routes = routes;
    this.Navigation = Navigation;
    this.NotFoundPage = NotFoundPage;
    this.RouterContext = RouterContext;
    this.initRouter();
    this.route();
  }

  initRouter() {
    this.target.addEventListener('click', e => {
      const closest = e.target.closest('a');
      if (!closest || !closest.classList.contains('router')) return;
      e.preventDefault();
      const pathname = closest.getAttribute('href') || '/NOTFOUND';
      this.push(pathname);
    });

    window.addEventListener('popstate', () => {
      RouterContext.setState({ pathname: getPathname(), query: getQuery() });
      this.route();
    });

    RouterContext.setState({ push: url => this.push(url) });
    RouterContext.setState({ goBack: () => this.goBack() });
  }

  async route() {
    const currentPath = this.RouterContext.state.pathname.slice(1).split('/');
    // history.pushState(null, null, location.href.replace(/#.*/, ''));
    await auth.getMyInfo();

    for (let i = 0; i < this.routes.length; i += 1) {
      const routePath = this.routes[i].path.slice(1).split('/');
      const { loginRequired } = this.routes[i];

      const params = pathValidation(currentPath, routePath);
      if (!params) continue;

      const next = loginValidation(loginRequired);
      if (!next) return this.replace('/');

      RouterContext.setState({ params });
      const Page = this.routes[i].component;

      // render Header & Page
      const token = auth.getToken();
      const loginState = state.myInfo !== undefined && token !== undefined;
      new this.Navigation({
        $root: this.target,
        loginState,
      });
      new Page(this.target);
      return;
    }
    new this.NotFoundPage(this.target);
  }

  push(url) {
    window.history.pushState(null, '', url);
    this.setCurURL(url);
  }

  replace(url) {
    window.history.replaceState(null, '', url);
    this.setCurURL(url);
  }

  setCurURL(url) {
    RouterContext.setState({ pathname: url, query: getQuery() });
    this.route();
  }

  goBack() {
    window.history.back();
  }
}

export default Router;
