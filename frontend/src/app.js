import EditPostPage from './pages/EditPostPage/EditPostPage';
import CreatPostPage from './pages/CreatePostPage/CreatePostPage';
import MainPage from './pages/MainPage/MainPage';
import BookmarkPage from './pages/BookmarkPage/BookmarkPage';
import DetailPage from './pages/DetailPage/DetailPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RecommendPage from './pages/RecommendPage/RecommendPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Router from './router/Router';
import Navigation from './components/Navigation/Navigation';
import { requestAutoLogin } from './utils/auth';

class App {
  constructor({ container }) {
    this.container = container;
    this.routes = [
      { path: '/', Component: MainPage, loginRequired: false },
      { path: '/study', Component: MainPage, loginRequired: false },
      { path: '/detail/:postId', Component: DetailPage, loginRequired: false },
      { path: '/bookmark', Component: BookmarkPage, loginRequired: true },
      { path: '/write', Component: CreatPostPage, loginRequired: true },
      { path: '/write/:postId', Component: EditPostPage, loginRequired: true },
      { path: '/profile', Component: ProfilePage, loginRequired: true },
      { path: '/recommend', Component: RecommendPage, loginRequired: true },
      { path: '/NotFound', Component: NotFoundPage, loginRequired: false },
    ];
    this.render();
  }

  async render() {
    await requestAutoLogin();

    new Navigation({ container: document.getElementById('header') });
    new Router({ container: this.container, routes: this.routes });
  }
}

export default App;
