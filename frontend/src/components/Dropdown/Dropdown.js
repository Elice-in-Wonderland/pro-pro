import CustomComponent from '../CustomComponent';
import RouterContext from '../../router/RouterContext';
import { state, removeState, removeToken } from '../../utils/store';
import './dropdown.scss';

const DEFAULT_PROFILE_IMAGE =
  'https://user-images.githubusercontent.com/68373235/146498583-71b583f6-04d7-43be-b790-bbb264a95390.png';

export default class Dropdown extends CustomComponent {
  init() {
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleDropdownContent = this.handleDropdownContent.bind(this);
  }

  markup() {
    return (
      <div class="dropdown">
        <div class="profile" onClick={this.toggleDropdown}>
          <img
            src={state.myInfo?.imageURL || DEFAULT_PROFILE_IMAGE}
            alt="profile"
            class="profile__image"
          />
        </div>
        <ul class="dropdown__content" onClick={this.handleDropdownContent}>
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
    window.addEventListener('click', ({ target }) => {
      const isOutsideDropdown = !target.closest('.dropdown');
      if (isOutsideDropdown) this.hiddenDropdown();
    });
  }

  handleDropdownContent(event) {
    const { target } = event;
    const isClickLink = target.classList.contains('router');
    const isClickLogout = target.classList.contains('logout');

    if (isClickLink) this.hiddenDropdown();

    if (isClickLogout) {
      event.preventDefault();
      this.handleLogout();
    }
  }

  toggleDropdown() {
    const dropdownContent = this.container.querySelector('.dropdown__content');
    dropdownContent.classList.toggle('dropdown__content--active');
  }

  hiddenDropdown() {
    const dropdownContent = this.container.querySelector('.dropdown__content');
    dropdownContent.classList.remove('dropdown__content--active');
  }

  handleLogout() {
    removeToken();
    removeState('myInfo');
    RouterContext.state.reload();
  }
}
