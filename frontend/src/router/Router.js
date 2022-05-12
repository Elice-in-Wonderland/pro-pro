import RouterContext from './RouterContext';
import { getPathname, getQuery, isAllowedRoute } from './utils';

class Router {
  constructor({ container, routes }) {
    this.container = container;
    this.routes = routes;
    this.initRouter();
    this.route();
  }

  route() {
    const currentPath = RouterContext.state.pathname.slice(1).split('/');
    const { path, Component, loginRequired } =
      this.matchUrlToRoute(currentPath);

    const next = isAllowedRoute(loginRequired);
    if (!next) return this.replace('/');

    // REMOVE: 모든 페이지 바뀌기전까지 임시 라우팅----------
    if (
      path === '/' ||
      path === '/study' ||
      path === '/detail/:postId' ||
      path === '/bookmark' ||
      path === '/profile' ||
      path === '/NotFound'
    ) {
      new Component({ container: this.container });
      return;
    }
    // REMOVE: 모든 페이지 바뀌기전까지 임시 라우팅-------------

    new Component(this.container);
  }

  matchUrlToRoute(currentPath) {
    const params = {};

    const matchedRoute = this.routes.find(route => {
      const splittedRoutePath = route.path.split('/').slice(1);
      const firstPathname = splittedRoutePath[0];

      // 만약 배열의 끝이면 true
      if (firstPathname === 'NotFound') return true;

      // routePath의 갯수가 다르면 false
      // ex) ['/detail', '/:postId'] , ['detail']
      if (splittedRoutePath.length !== currentPath.length) return false;
      // 중첩 routePath 확인하면서 params 저장
      // ex) path1/:dynamicPath, path1/path2
      return splittedRoutePath.every((routePath, idx) => {
        if (/^:/.test(routePath)) {
          const propName = routePath.slice(1);
          params[propName] = decodeURIComponent(currentPath[idx]);
          return true;
        }

        if (routePath === currentPath[idx]) return true;

        return false;
      });
    });

    RouterContext.setState({ params });

    return matchedRoute;
  }

  initRouter() {
    window.addEventListener('click', e => {
      const closest = e.target.closest('a');
      if (!closest || !closest.classList.contains('router')) return;
      e.preventDefault();
      const pathname = closest.getAttribute('href') || '/NotFound';
      this.push(pathname);
    });

    window.addEventListener('popstate', () => {
      RouterContext.setState({ pathname: getPathname(), query: getQuery() });
      this.route();
    });

    RouterContext.setState({
      push: url => this.push(url),
      replace: url => this.replace(url),
      goBack: () => this.goBack(),
      reload: () => this.reload(),
    });
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
