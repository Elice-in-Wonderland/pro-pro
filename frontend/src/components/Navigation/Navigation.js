import { getToken } from '../../utils/auth';
import Component from '../component';
import Logo from '../Logo/Logo';
import './navigation.scss';
import NavItem from './NavItem';

export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('nav', {
      className: 'gnb',
    });

    this.state = {
      loginState: !!getToken(),
    };

    this.render();
  }

  replaceNav() {
    this.setState({
      ...this.state,
      loginState: true,
    });
  }

  componentDidMount() {
    const navList = this.$dom.querySelector('.nav-list');
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
            onLogin: this.replaceNav.bind(this),
          },
        ];

    const fragment = new DocumentFragment();

    navItems.forEach(li => {
      const list = new NavItem(li);
      if (list.$dom) {
        fragment.appendChild(list.$dom);
      }
    });

    this.$dom.prepend(new Logo().$dom);
    navList.appendChild(fragment);
  }

  render = () => {
    this.$dom.innerHTML = `
      <ul class='nav-list'>
      </ul>
    `;

    this.appendRoot(this.props, this.$dom, true);
    this.componentDidMount();
  };
}
