import { getToken } from '../../utils/auth';
import { createDom } from '../../utils/dom';
import CustomComponent from '../CustomComponent';
import NavItem from './NavItem';
import Logo from '../Logo/Logo';
import './navigation.scss';

export default class Navigation extends CustomComponent {
  init() {
    this.state = {
      loginState: !!getToken(),
    };
  }

  markup() {
    return (
      <nav class="gnb">
        <ul class="gnb__inner"></ul>
      </nav>
    );
  }

  renderCallback() {
    const navList = this.container.querySelector('.gnb__inner');
    const gnb = this.container.querySelector('.gnb');
    const { loginState } = this.state;

    const navItems = loginState
      ? [
          {
            type: 'link',
            href: '/',
            text: '프로젝트',
            className: 'gnb__link router',
          },
          {
            type: 'link',
            href: '/study',
            text: '스터디',
            className: 'gnb__link router',
          },
          {
            type: 'link',
            href: '/recommend',
            text: '추천',
            className: 'gnb__link router',
          },
          {
            type: 'link',
            href: '/write',
            text: '새 글 쓰기',
            className: 'gnb__link router',
          },
          {
            type: 'profile',
            className: 'dropdown',
            list: [
              {
                type: 'link',
                href: '/bookmark',
                text: '내 북마크',
                className: 'dropdown__link router',
              },
              {
                type: 'link',
                href: '/profile',
                text: '프로필',
                className: 'dropdown__link router',
              },
              {
                type: 'link',
                href: '/',
                text: '로그아웃',
                className: 'dropdown__link logout',
              },
            ],
          },
        ]
      : [
          {
            type: 'link',
            href: '/',
            text: '프로젝트',
            className: 'gnb__link router',
          },
          {
            type: 'link',
            href: '/study',
            text: '스터디',
            className: 'gnb__link router',
          },
          {
            type: 'modal',
            text: '로그인',
            className: 'gnb__button gnb__button--login',
            onLogin: this.handleLogin.bind(this),
          },
        ];

    const logo = createDom('a', {
      className: 'logo router',
      href: '/',
    });
    const fragment = new DocumentFragment();

    navItems.forEach(item => {
      const li = createDom('li', { className: 'gnb__item' });
      new NavItem({ container: li, props: item });
      fragment.appendChild(li);
    });
    new Logo({ container: logo });

    gnb.prepend(logo);
    navList.appendChild(fragment);
  }

  handleLogin() {
    this.setState({ ...this.state, loginState: true });
  }
}
