import routerContext from './RouterContext';
import {
  getPathname,
  getQuery,
  pathValidation,
  loginValidation,
} from './utils';

class Router {
  constructor(target, routes, NotFoundPage, Navigation) {
    this.target = target;
    this.routes = routes;
    this.NotFoundPage = NotFoundPage;
    this.Navigation = Navigation;
    this.routerContext = routerContext;
    this.push = this.push.bind(this);
    this.goBack = this.goBack.bind(this);
    this.set();
    this.route();
    this.addLinkChangeHandler();
    this.addBackChangeHandler();
  }

  set() {
    routerContext.setState({ push: url => this.push(url) });
    routerContext.setState({ goBack: () => this.goBack() });
  }

  route() {
    const currentPath = this.routerContext.state.pathname.slice(1).split('/');

    for (let i = 0; i < this.routes.length; i += 1) {
      const routePath = this.routes[i].path.slice(1).split('/');
      const { loginRequired } = this.routes[i];

      const params = pathValidation(currentPath, routePath);
      if (!params) continue;

      // login check 여부에 따라 세션에서 제거하면서 뒤로가기
      const next = loginValidation(loginRequired);
      if (!next) {
        this.replace('/');
        return;
      }
      routerContext.setState({ params });
      const Page = this.routes[i].component;

      new this.Navigation(this.target);
      new Page(this.target);
      return;
    }
    new this.NotFoundPage(this.target);
  }

  addLinkChangeHandler() {
    this.target.addEventListener('click', e => {
      const { target } = e;
      const closest = target.closest('a');
      if (!closest || closest.getAttribute('target')) return;
      e.preventDefault();
      const pathname = closest.getAttribute('href');
      this.push(pathname);
    });
  }

  addBackChangeHandler() {
    window.addEventListener('popstate', () => {
      routerContext.setState({ pathname: getPathname(), query: getQuery() });
      this.route();
    });
  }

  push(url) {
    window.history.pushState(null, '', url);
    routerContext.setState({ pathname: url, query: getQuery() });
    this.route();
  }

  replace(url) {
    // 현재 권한 없는 페이지는 기본 페이지로 이동
    window.history.replaceState(null, '', url);
    routerContext.setState({ pathname: url, query: getQuery() });
    this.route();
  }

  goBack() {
    window.history.back();
  }
}

export default Router;
