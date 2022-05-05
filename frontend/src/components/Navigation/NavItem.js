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
    const modalContainer = this.container.querySelector('.modal-background');

    this.container.addEventListener('click', event => {
      const { target } = event;

      if (target.classList.contains('profile-img')) {
        menu.classList.toggle('active');
      }

      if (target.classList.contains('login-text')) {
        modalContainer.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }

      if (menu.contains(target) && target.classList.contains('router')) {
        this.hiddenDropbox();
      }

      if (target.classList.contains('nav-logout')) {
        event.preventDefault();
        this.handleLogout();
      }
    });

    if (this.props.type === 'profile') {
      window.addEventListener('click', e => {
        if (!dropBox.contains(e.target)) this.hiddenDropbox();
      });
    }
  }

  hiddenDropbox() {
    const menu = this.container.querySelector('.menu');
    menu.classList.remove('active');
  }

  handleLogout() {
    removeToken();
    removeState('myInfo');
    RouterContext.state.reload();
  }
}
