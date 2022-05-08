import { state, removeState, removeToken } from '../../utils/store';
import RouterContext from '../../router/RouterContext';
import CustomComponent from '../CustomComponent';
import './dropdown.scss';

const DEFAULT_PROFILE =
  'https://user-images.githubusercontent.com/68373235/146498583-71b583f6-04d7-43be-b790-bbb264a95390.png';

export default class Dropdown extends CustomComponent {
  markup() {
    return (
      <div class="dropdown">
        <div class="profile">
          <img
            src={state.myInfo?.imageURL || DEFAULT_PROFILE}
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

  setEvent() {
    this.container.addEventListener('click', event => {
      const { target } = event;

      if (
        target.closest('.dropdown__content') &&
        target.classList.contains('router')
      ) {
        this.hiddendropdown();
      }

      if (target.classList.contains('logout')) {
        event.preventDefault();
        this.handleLogout();
      }
    });

    window.addEventListener('click', ({ target }) => {
      if (!target.closest('.dropdown')) this.hiddendropdown();
    });
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
