import Cookies from 'js-cookie';
import CreatPostPage from './pages/CreatePostPage/CreatePostPage';
import MainPage from './pages/MainPage/MainPage';
import BookmarkPage from './pages/BookmarkPage/BookmarkPage';
import DetailPage from './pages/DetailPage/DetailPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import Router from './router/Router';
import Navigation from './components/Navigation/Navigation';

import axiosInstance from './utils/api';
import { state, setState } from './utils/store';

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
    this.getMyInfo();
  }

  render() {
    new Router(this.target, this.routes, this.NotFoundPage, this.navigation);
  }

  async getMyInfo() {
    const token = Cookies.get('AG3_JWT');
    if (token) {
      const { data } = await axiosInstance('/users', { withCredentials: true });
      const myInfo = data.data;
      if (!state.myInfo) setState('myInfo', myInfo);
    }
  }
}

export default App;
