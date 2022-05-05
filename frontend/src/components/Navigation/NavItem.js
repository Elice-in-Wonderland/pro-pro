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
        <div class={this.props.className}>
          <div class="profile">
            <img
              src={
                state.myInfo?.imageURL ||
                'https://user-images.githubusercontent.com/68373235/146498583-71b583f6-04d7-43be-b790-bbb264a95390.png'
              }
              alt="profile"
              class="profile__image"
            />
          </div>
          <ul class="dropdown__content">
            {this.props.list.map(li => (
              <li class="dropdown__item">
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
      return <p class="login">로그인</p>;
    }
  }

  renderCallback() {
    if (this.props.type === 'modal') {
      const modalContainer = createDom('div', {
        className: 'login-modal login-modal--hidden',
      });

      new LoginModal({
        container: modalContainer,
        props: { onLogin: this.props.onLogin },
      });

      this.container.append(modalContainer);
    }
  }

  setEvent() {
    const dropdownCotent = this.container.querySelector('.dropdown__content');
    const dropdown = this.container.querySelector('.dropdown');
    const modalContainer = this.container.querySelector('.login-modal');

    this.container.addEventListener('click', event => {
      const { target } = event;

      if (target.classList.contains('profile__image')) {
        dropdownCotent.classList.toggle('dropdown__content--active');
      }

      if (target.classList.contains('login')) {
        modalContainer.classList.remove('login-modal--hidden');
        document.body.style.overflow = 'hidden';
      }

      if (target.classList.contains('logout')) {
        event.preventDefault();
        this.handleLogout();
      }
    });

    if (this.props.type === 'profile') {
      this.container.addEventListener('click', event => {
        const { target } = event;

        if (
          dropdownCotent.contains(target) &&
          target.classList.contains('router')
        ) {
          this.hiddendropdown();
        }
      });

      window.addEventListener('click', e => {
        if (!dropdown.contains(e.target)) this.hiddendropdown();
      });
    }
  }

  hiddendropdown() {
    const dropdownCotent = this.container.querySelector('.dropdown__content');
    dropdownCotent.classList.remove('dropdown__content--active');
  }

  handleLogout() {
    removeToken();
    removeState('myInfo');
    RouterContext.state.reload();
  }
}
