import RouterContext from './RouterContext';
import {
  getPathname,
  getQuery,
  pathValidation,
  loginValidation,
} from './utils';

class Router {
  constructor(target, routes, NotFoundPage) {
    this.target = target;
    this.routes = routes;
    this.NotFoundPage = NotFoundPage;
    this.RouterContext = RouterContext;
    this.initRouter();
    this.route();
  }

  initRouter() {
    window.addEventListener('click', e => {
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

    RouterContext.setState({ reload: () => this.reload() });
    RouterContext.setState({ push: url => this.push(url) });
    RouterContext.setState({ replace: url => this.replace(url) });
    RouterContext.setState({ goBack: () => this.goBack() });
  }

  route() {
    const currentPath = this.RouterContext.state.pathname.slice(1).split('/');

    for (let i = 0; i < this.routes.length; i += 1) {
      const routePath = this.routes[i].path.slice(1).split('/');
      const { loginRequired } = this.routes[i];

      const params = pathValidation(currentPath, routePath);
      if (!params) continue;

      const next = loginValidation(loginRequired);
      if (!next) return this.replace('/');

      RouterContext.setState({ params });
      const Page = this.routes[i].component;
      window.scrollTo(0, 0);

      // TODO: 전체 리팩토링 후  삭제해야할 부분
      if (
        currentPath[0] === 'profile' ||
        currentPath[0] === '' ||
        currentPath[0] === 'detail' ||
        currentPath[0] === 'bookmark' ||
        currentPath[0] === 'study'
      ) {
        new Page({ container: this.target });
        return;
      }
      new Page(this.target);
      return;
    }
    new this.NotFoundPage({ container: this.target });
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

  reload() {
    window.location.reload();
  }
}

export default Router;
