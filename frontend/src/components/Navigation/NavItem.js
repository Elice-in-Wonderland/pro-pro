import Component from '../component';
import LoginModal from '../LoginModal/LoginModal';
import { removeToken } from '../../utils/auth';
import { state, removeState } from '../../utils/store';
import RouterContext from '../../router/RouterContext';

export default class NavItem extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('li', {});

    this.render();
    this.addEvent();
    this.componentDidMount();
  }

  componentDidMount() {
    if (this.props.type === 'link') return;

    if (this.props.type === 'profile') {
      const menu = this.$dom.querySelector('.menu');
      const fragment = new DocumentFragment();

      this.props.list.forEach(li => {
        const $li = this.createDom('li', {});
        const $a = this.createDom('a', {
          href: li.href,
          className: li.className,
          innerText: li.text,
        });
        if (li.text === '로그아웃') {
          $a.addEventListener('click', e => {
            e.preventDefault();
            removeToken();
            removeState('myInfo');
            RouterContext.state.reload();
          });
        }
        $li.appendChild($a);
        fragment.appendChild($li);
      });

      menu.appendChild(fragment);
      return;
    }

    if (this.props.type === 'modal') {
      this.loginModalRef = new LoginModal({ onLogin: this.props.onLogin }).$dom;
      this.$dom.append(this.loginModalRef);
    }
  }

  addEvent = () => {
    const menu = this.$dom.querySelector('.menu');
    const dropBox = this.$dom.querySelector('.drop-box');
    const profileImg = this.$dom.querySelector('.profile-img');
    const loginText = this.$dom.querySelector('.login-text');

    if (this.props.type === 'link') return;

    if (this.props.type === 'profile') {
      profileImg.addEventListener('click', () => {
        menu.classList.toggle('active');
      });

      menu.addEventListener('click', e => {
        if (e.target.classList.contains('router')) {
          menu.classList.remove('active');
        }
      });

      document.querySelector('#root').addEventListener('click', e => {
        if (!dropBox.contains(e.target)) menu.classList.remove('active');
      });
      return;
    }

    if (this.props.type === 'modal') {
      this.$dom.addEventListener('click', e => {
        if (e.target === loginText) {
          this.loginModalRef.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }
      });
    }
  };

  render = () => {
    if (this.props.type === 'link') {
      this.$dom.innerHTML = `
        <a href=${this.props.href} class="${this.props.className}">${this.props.text}</a>
      `;
      return;
    }

    if (this.props.type === 'profile') {
      this.$dom.innerHTML = `
        <div class="drop-box">
          <div class="profile">
            <img src=${
              state.myInfo?.imageURL ||
              'https://user-images.githubusercontent.com/68373235/146498583-71b583f6-04d7-43be-b790-bbb264a95390.png'
            } alt="profile" class="profile-img" />
          </div>
          <ul class="menu">
          </ul>
        </div>
      `;
      return;
    }

    if (this.props.type === 'modal') {
      this.$dom.innerHTML = `
        <p class="login-text">로그인</p>
      `;
    }
  };
}
