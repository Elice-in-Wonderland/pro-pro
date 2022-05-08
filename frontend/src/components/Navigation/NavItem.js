import CustomComponent from '../CustomComponent';
import LoginModal from '../LoginModal/LoginModal';
import Dropdown from '../Dropdown/Dropdown';

export default class NavItem extends CustomComponent {
  markup() {
    if (this.props.type === 'link') {
      return (
        <a href={this.props.href} class={this.props.className}>
          {this.props.text}
        </a>
      );
    }
  }

  renderCallback() {
    if (this.props.type === 'profile') {
      new Dropdown({
        container: this.container,
        props: this.props,
      });
    }

    if (this.props.type === 'modal') {
      new LoginModal({
        container: this.container,
        props: this.props,
      });
    }
  }

  setEvent() {
    this.container.addEventListener('click', event => {
      const { target } = event;

      // active/hidden dropdown
      if (target.classList.contains('profile__image')) {
        const dropdownCotent =
          this.container.querySelector('.dropdown__content');

        dropdownCotent.classList.toggle('dropdown__content--active');
      }

      // active modal
      if (target.classList.contains('gnb__button--login')) {
        const modalContainer = this.container.querySelector('.login-modal');

        modalContainer.classList.add('login-modal--active');
        document.body.style.overflow = 'hidden';
      }
    });
  }
}
