import Component from '../component';

import './loginModal.scss';

import proproLogo from '../../assets/images/pro-pro.png';
import kakaoLogo from '../../assets/images/kakao-logo.svg';
import googleLogo from '../../assets/images/google-logo.svg';
import xButton from '../../assets/images/x-button.svg';

export default class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: 'login-modal-wrapper',
    });

    props.$app.appendChild(this.$dom);

    this.render();

    this.addEvent();
  }

  render = () => {
    this.$dom.insertAdjacentHTML(
      'beforeend',
      `
    <img class="login-exit-btn" src="${xButton}" />
    <div class="login-container">
      <div class="login-header">
        <div class="login-greeting">
          환영합니다!
        </div>
        <img class="login-image" src="${proproLogo}" />
      </div>
      <div class="login-btn-wrapper">
        <div class="login-sns google">
          <img class="login-btn" src="${googleLogo}" />
          <div class="login-text">Google로 로그인</div>
        </div>
        <div class="login-sns kakao">
          <img class="login-btn" src="${kakaoLogo}" />
          <div class="login-text">Kakao로 로그인</div>
        </div>
      </div>
    </div>
  `,
    );
  };

  addEvent = () => {
    const BASE_URL = 'http://localhost:4000';

    document.querySelector('.google').addEventListener('click', () => {
      location.href = `${BASE_URL}/users/auth/google`;
    });
    document.querySelector('.kakao').addEventListener('click', () => {
      location.href = `${BASE_URL}/users/auth/kakao`;
    });
  };
}
