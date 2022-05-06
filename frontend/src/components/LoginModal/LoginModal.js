import Cookies from 'js-cookie';
import CustomComponent from '../CustomComponent';
import './loginModal.scss';
import proproLogo from '../../assets/images/pro-pro.png';
import xButton from '../../assets/images/x-button.svg';
import axiosInstance from '../../utils/api';
import Toast from '../Toast/Toast';
import { setState } from '../../utils/store';
import { parseJwt } from '../../utils/common';
import { restructingMyInfo } from '../../utils/auth';

const DEFAULT_PROFILE =
  'https://user-images.githubusercontent.com/68373235/146498583-71b583f6-04d7-43be-b790-bbb264a95390.png';

export default class LoginModal extends CustomComponent {
  markup() {
    return (
      <fragment>
        <button class={this.props.className} aria-label="로그인버튼">
          로그인
        </button>
        <div class="login-modal">
          <div class="login-modal__background">
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
    const modalContainer = this.container.querySelector(
      '.login-modal__content',
    );
    const exitBtn = this.container.querySelector('.login-modal__button--close');

    this.container.addEventListener('click', ({ target }) => {
      if (!modalContainer.contains(target)) return this.hiddenModal();

      if (exitBtn.contains(target)) {
        return this.hiddenModal();
      }
    });

    window.addEventListener('load', () => {
      this.initGoogle();
    });
  }

  initGoogle() {
    window.google.accounts.id.initialize({
      client_id: `${process.env.GOOGLE_API_KEY}`,
      callback: this.handleCredentialResponse.bind(this),
    });
    window.google.accounts.id.renderButton(
      document.getElementById('google-login__button'),
      { width: '190px' },
    );
  }

  hiddenModal() {
    const modalContainer = this.container.querySelector('.login-modal');

    modalContainer.classList.remove('login-modal--active');
    document.body.style.overflow = 'scroll';
  }

  async handleCredentialResponse(response) {
    const { sub: snsId, picture } = parseJwt(response.credential);

    const user = {
      snsId,
      snsType: 'google',
      imageURL: picture || DEFAULT_PROFILE,
    };

    try {
      const res = await axiosInstance.post('/users', user, {
        withCredentials: true,
      });
      const { AG3_JWT } = res.data.data;
      const myInfo = restructingMyInfo(res.data.data);

      setState('myInfo', myInfo);
      Cookies.set('AG3_JWT', AG3_JWT);
      this.hiddenModal();
      this.props.onLogin();
    } catch (e) {
      new Toast({ content: '로그인에 실패하였습니다', type: 'fail' });
    }
  }
}
