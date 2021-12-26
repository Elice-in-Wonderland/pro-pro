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

class App {
  constructor(target) {
    this.target = target;
    this.routes = [
      { path: '/', component: MainPage, loginRequired: false },
      { path: '/study', component: MainPage, loginRequired: false },
      { path: '/detail/:postId', component: DetailPage, loginRequired: false },
      { path: '/bookmark', component: BookmarkPage, loginRequired: true },
      { path: '/write', component: CreatPostPage, loginRequired: true },
      { path: '/write/:postId', component: EditPostPage },
      { path: '/profile', component: ProfilePage, loginRequired: true },
      { path: '/recommend', component: RecommendPage, loginRequired: true },
    ];
    this.NotFoundPage = NotFoundPage;
    this.render();
  }

  render() {
    new Navigation(this.target);
    new Router(this.target, this.routes, this.NotFoundPage, this.navigation);
  }
}

export default App;
