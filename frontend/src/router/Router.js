import routerContext from './RouterContext';
import { getPathname, getQuery, pathValidation } from './utils';

class Router {
  constructor(target, routes, NotFoundPage) {
    this.target = target;
    this.routes = routes;
    this.NotFoundPage = NotFoundPage;
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
    for (let i = 0; i < this.routes.length; i++) {
      const routePath = this.routes[i].path.slice(1).split('/');
      const params = pathValidation(currentPath, routePath);
      if (!params) continue;
      routerContext.setState({ params });
      const Page = this.routes[i].component;
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

  goBack() {
    window.history.back();
  }
}

export default Router;
