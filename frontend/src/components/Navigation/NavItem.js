import LoginModal from '../LoginModal/LoginModal';
import { removeToken } from '../../utils/auth';
import { state, removeState } from '../../utils/store';
import RouterContext from '../../router/RouterContext';
import CustomComponent from '../CustomComponent';
import { createDom } from '../../utils/dom';

export default class NavItem extends CustomComponent {
  markup() {
    if (this.props.type === 'link') {
      return (
        <a href={this.props.href} class={this.props.className}>
          {this.props.text}
        </a>
      );
    }

    if (this.props.type === 'profile') {
      return (
        <div class="drop-box">
          <div class="profile">
            <img
              src={
                state.myInfo?.imageURL ||
                'https://user-images.githubusercontent.com/68373235/146498583-71b583f6-04d7-43be-b790-bbb264a95390.png'
              }
              alt="profile"
              class="profile-img"
            />
          </div>
          <ul class="menu">
            {this.props.list.map(li => (
              <li>
                <a href={li.href} class={li.className}>
                  {li.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (this.props.type === 'modal') {
      return <p class="login-text">로그인</p>;
    }
  }

  renderCallback() {
    if (this.props.type === 'modal') {
      const modalContainer = createDom('div', {
        className: 'modal-background hidden',
      });

      new LoginModal({
        container: modalContainer,
        props: { onLogin: this.props.onLogin },
      });

      this.container.append(modalContainer);
    }
  }

  setEvent() {
    const menu = this.container.querySelector('.menu');
    const dropBox = this.container.querySelector('.drop-box');
    const profileImg = this.container.querySelector('.profile-img');
    const loginText = this.container.querySelector('.login-text');
    const logoutBtn = this.container.querySelector('.nav-logout');
    const modalContainer = this.container.querySelector('.modal-background');

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

      logoutBtn.addEventListener('click', e => {
        e.preventDefault();
        removeToken();
        removeState('myInfo');
        RouterContext.state.reload();
      });

      document.querySelector('#root').addEventListener('click', e => {
        if (!dropBox.contains(e.target)) menu.classList.remove('active');
      });
      return;
    }

    if (this.props.type === 'modal') {
      this.container.addEventListener('click', e => {
        if (e.target === loginText) {
          modalContainer.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }
      });
    }
  }
}
