import { getToken } from '../../utils/auth';
import { createDom } from '../../utils/dom';
import CustomComponent from '../CustomComponent';
import Logo from '../Logo/Logo';
import './navigation.scss';
import NavItem from './NavItem';

export default class Navigation extends CustomComponent {
  init() {
    this.state = {
      loginState: !!getToken(),
    };
  }

  markup() {
    return <ul class="nav-list"></ul>;
  }

  renderCallback() {
    const navList = this.container.querySelector('.nav-list');
    const { loginState } = this.state;

    const navItems = loginState
      ? [
          {
            type: 'link',
            href: '/',
            text: '프로젝트',
            className: 'nav-project router',
          },
          {
            type: 'link',
            href: '/study',
            text: '스터디',
            className: 'nav-study router',
          },
          {
            type: 'link',
            href: '/recommend',
            text: '추천',
            className: 'nav-recommend router',
          },
          {
            type: 'link',
            href: '/write',
            text: '새 글 쓰기',
            className: 'nav-write router',
          },
          {
            type: 'profile',
            text: '프로필',
            className: 'nav-profile',
            list: [
              {
                type: 'link',
                href: '/bookmark',
                text: '내 북마크',
                className: 'nav-bookmark router',
              },
              {
                type: 'link',
                href: '/profile',
                text: '프로필',
                className: 'nav-profile router',
              },
              {
                type: 'link',
                href: '/',
                text: '로그아웃',
                className: 'nav-logout',
              },
            ],
          },
        ]
      : [
          {
            type: 'link',
            href: '/',
            text: '프로젝트',
            className: 'nav-project router',
          },
          {
            type: 'link',
            href: '/study',
            text: '스터디',
            className: 'nav-study router',
          },
          {
            type: 'modal',
            text: '로그인',
            className: 'nav-login',
            onLogin: this.handleLogin.bind(this),
          },
        ];

    const logo = createDom('a', {
      className: 'logo router',
      href: '/',
    });
    const fragment = new DocumentFragment();

    new Logo({ container: logo });

    navItems.forEach(item => {
      const li = createDom('li', {});
      new NavItem({ container: li, props: item });
      fragment.appendChild(li);
    });

    this.container.prepend(logo);
    navList.appendChild(fragment);
  }

  handleLogin() {
    this.setState({ ...this.state, loginState: true });
  }
}
