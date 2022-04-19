import { getToken } from '../../utils/auth';
import Component from '../component';
import Logo from '../Logo/Logo';
import './navigation.scss';
import NavItem from './NavItem';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    const token = getToken();

    this.$dom = this.createDom('nav', {
      className: 'gnb',
    });

    this.$logo = new Logo();

    this.state = {
      loginState: !!token,
    };

    this.render();
  }

  replaceNav = () => {
    this.setState({
      ...this.state,
      loginState: true,
    });
  };

  render = () => {
    this.$navItems = this.state.loginState
      ? [
          {
            type: 'a',
            href: '/',
            text: '프로젝트',
            className: 'nav-project router',
          },
          {
            type: 'a',
            href: '/study',
            text: '스터디',
            className: 'nav-study router',
          },
          {
            type: 'a',
            href: '/recommend',
            text: '추천',
            className: 'nav-recommend router',
          },
          {
            type: 'a',
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
                type: 'a',
                href: '/bookmark',
                text: '내 북마크',
                className: 'nav-bookmark router',
              },
              {
                type: 'a',
                href: '/profile',
                text: '프로필',
                className: 'nav-profile router',
              },
              {
                type: 'a',
                href: '/',
                text: '로그아웃',
                className: 'nav-logout',
              },
            ],
          },
        ]
      : [
          {
            type: 'a',
            href: '/',
            text: '프로젝트',
            className: 'nav-project router',
          },
          {
            type: 'a',
            href: '/study',
            text: '스터디',
            className: 'nav-study router',
          },
          {
            type: 'modal',
            text: '로그인',
            className: 'nav-login',
            onLogin: this.replaceNav,
          },
        ];

    this.$dom.innerHTML = `
      <ul class='nav-list'>
      </ul>
    `;

    const $navList = this.$dom.querySelector('.nav-list');
    const fragment = new DocumentFragment();
    this.$dom.prepend(this.$logo.$dom);
    this.$navItems.forEach(li => {
      const list = new NavItem(li);
      if (list.$dom) {
        fragment.appendChild(list.$dom);
      }
    });
    $navList.appendChild(fragment);

    this.appendRoot(this.props, this.$dom, true);
  };
}
