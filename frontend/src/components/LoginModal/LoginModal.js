import proproLogo from '@assets/images/pro-pro.png';
import xButton from '@assets/images/x-button.svg';
import { parseJwt } from '@utils/common';
import { requestLogin } from '@utils/auth';
import Component from '../Component';
import Toast from '../Toast/Toast';
import { defaultProfileImage } from '../../library/Profile';
import './loginModal.scss';

export default class LoginModal extends Component {
  init() {
    this.showModal = this.showModal.bind(this);
    this.hiddenModal = this.hiddenModal.bind(this);
    this.handleCredentialResponse = this.handleCredentialResponse.bind(this);
  }

  markup() {
    return (
      <fragment>
        <button
          class={this.props.className}
          aria-label="로그인버튼"
          onClick={this.showModal}
        >
          로그인
        </button>
        <div class="login-modal">
          <div class="login-modal__background" onClick={this.hiddenModal}>
            <div class="login-modal__content">
              <button class="login-modal__button login-modal__button--close">
                <img src={xButton} />
              </button>
              <div class="login-modal__title">환영합니다!</div>
              <img class="login-modal__image" src={proproLogo} />
              <div class="google-login">
                <div id="google-login__button"></div>
              </div>
            </div>
          </div>
        </div>
      </fragment>
    );
  }

  setEvent() {
    window.addEventListener('load', () => {
      this.initializeGoogleLogin();
    });
  }

  initializeGoogleLogin() {
    window.google.accounts.id.initialize({
      client_id: `${process.env.GOOGLE_API_KEY}`,
      callback: this.handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById('google-login__button'),
      { width: '190px' },
    );
  }

  showModal() {
    const modalContainer = this.container.querySelector('.login-modal');
    modalContainer.classList.add('login-modal--active');
    document.body.style.overflow = 'hidden';
  }

  hiddenModal({ target }) {
    const isInsideModal = target.closest('.login-modal__content');
    const isClickCloseBtn = target.closest('.login-modal__button--close');
    if (isInsideModal && !isClickCloseBtn) return;

    const modalContainer = this.container.querySelector('.login-modal');

    modalContainer.classList.remove('login-modal--active');
    document.body.style.overflow = 'scroll';
  }

  async handleCredentialResponse(response) {
    const { sub: snsId, picture } = parseJwt(response.credential);

    const user = {
      snsId,
      snsType: 'google',
      imageURL: picture || defaultProfileImage,
    };

    try {
      await requestLogin(user);
      this.props.onLogin();
    } catch (e) {
      new Toast({ content: '로그인에 실패하였습니다', type: 'fail' });
    }
  }
}
