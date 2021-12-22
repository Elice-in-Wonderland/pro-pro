import CreatPostPage from './pages/CreatePostPage/CreatePostPage';
import MainPage from './pages/MainPage/MainPage';
import BookmarkPage from './pages/BookmarkPage/BookmarkPage';
import DetailPage from './pages/DetailPage/DetailPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import Router from './router/Router';
import Navigation from './components/Navigation/Navigation';

class App {
  constructor(target) {
    this.target = target;
    this.navigation = Navigation;

    this.routes = [
      { path: '/', component: MainPage, loginRequired: false },
      { path: '/detail/:postId', component: DetailPage, loginRequired: false },
      { path: '/bookmark', component: BookmarkPage, loginRequired: true },
      { path: '/write', component: CreatPostPage, loginRequired: true },
      // { path: '/write/:postId', component: PostPage },
      { path: '/profile', component: ProfilePage, loginRequired: true },
    ];
    this.NotFoundPage = NotFoundPage;
    this.render();
  }

  render() {
    new Router(this.target, this.routes, this.NotFoundPage, this.navigation);
  }
}

export default App;
