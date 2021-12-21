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
    this.navigation = new Navigation(target);

    this.routes = [
      { path: '/', component: MainPage },
      { path: '/detail/:postId', component: DetailPage },
      { path: '/bookmark', component: BookmarkPage },
      { path: '/write', component: CreatPostPage },
      // { path: '/write/:postId', component: PostPage },
      { path: '/profile', component: ProfilePage },
    ];
    this.NotFoundPage = NotFoundPage;
    this.render();
  }

  render() {
    new Router(this.target, this.routes, this.NotFoundPage);
  }
}

export default App;
