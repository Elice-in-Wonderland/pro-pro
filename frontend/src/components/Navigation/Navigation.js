import { getToken } from '@utils/store';
import { createDom } from '@utils/dom';
import CustomComponent from '../CustomComponent';
import Logo from '../Logo/Logo';
import Link from '../Link/Link';
import Dropdown from '../Dropdown/Dropdown';
import LoginModal from '../LoginModal/LoginModal';
import RouterContext from '../../router/RouterContext';
import './navigation.scss';

export default class Navigation extends CustomComponent {
  init() {
    this.state = {
      loginState: !!getToken(),
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
  }

  markup() {
    return (
      <nav class="gnb">
        <ul class="gnb__inner"></ul>
        <div class="hamburger" onClick={this.handleHamburgerClick}>
          <span class="hamburger__line"></span>
          <span class="hamburger__line"></span>
          <span class="hamburger__line"></span>
        </div>
      </nav>
    );
  }

  renderCallback() {
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
            onLogin: this.handleLogin,
          },
        ];

    this.appendNavItems(navItems);
    this.appendLogo();
  }

  appendNavItems(navItems) {
    const container = this.container.querySelector('.gnb__inner');
    const fragment = new DocumentFragment();

    navItems.forEach(item => {
      const li = createDom('li', { className: 'gnb__item' });
      this.makeNavItem(li, item);

      fragment.appendChild(li);
    });
    container.appendChild(fragment);
  }

  makeNavItem(container, item) {
    if (item.type === 'link') {
      new Link({
        container,
        props: item,
      });
    } else if (item.type === 'modal') {
      new LoginModal({
        container,
        props: item,
      });
    } else if (item.type === 'profile') {
      new Dropdown({
        container,
        props: item,
      });
    }
  }

  appendLogo() {
    const container = this.container.querySelector('.gnb');
    const logo = createDom('a', {
      className: 'logo router',
      href: '/',
    });

    new Logo({ container: logo });

    container.prepend(logo);
  }

  setEvent() {
    window.addEventListener('click', ({ target }) => {
      const isOutsideGnb = !target.closest('.gnb');

      if (isOutsideGnb) this.hiddenMobileGnb();
    });
  }

  handleHamburgerClick() {
    this.toggleMobileGnb();
  }

  hiddenMobileGnb() {
    const hamburger = this.container.querySelector('.hamburger');
    const navList = this.container.querySelector('.gnb__inner');

    hamburger.classList.remove('hamburger--active');
    navList.classList.remove('gnb__inner--active');
  }

  toggleMobileGnb() {
    const hamburger = this.container.querySelector('.hamburger');
    const navList = this.container.querySelector('.gnb__inner');

    hamburger.classList.toggle('hamburger--active');
    navList.classList.toggle('gnb__inner--active');
  }

  handleLogin() {
    this.setState({ ...this.state, loginState: true });
    RouterContext.state.reload();
  }
}
