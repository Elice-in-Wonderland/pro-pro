import Cookies from 'js-cookie';
import Component from '../component';
import './loginModal.scss';
import proproLogo from '../../assets/images/pro-pro.png';
import xButton from '../../assets/images/x-button.svg';
import axiosInstance from '../../utils/api';
import Toast from '../Toast/Toast';
import { setState } from '../../utils/store';
import { parseJwt } from '../../utils/common';
import { restructingMyInfo } from '../../utils/auth';

export default class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: 'modal-background hidden',
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.insertAdjacentHTML(
      'beforeend',
      `
        <div class="login-modal-wrapper">
            <img class="login-exit-btn" src="${xButton}" />
            <div class="login-container">
              <div class="login-header">
                <div class="login-greeting">
                  환영합니다!
                </div>
                <img class="login-image" src="${proproLogo}" />
              </div>
              <div class="login-btn-wrapper">
                <div id="google-login-btn"></div>
              </div>
            </div>
        </div>
      `,
    );
  };

  initGoogle() {
    window.google.accounts.id.initialize({
      client_id: `${process.env.GOOGLE_API_KEY}`,
      callback: this.handleCredentialResponse.bind(this),
    });
    window.google.accounts.id.renderButton(
      document.getElementById('google-login-btn'),
      { width: '190px' },
    );
  }

  async handleCredentialResponse(response) {
    const { sub: snsId, picture } = parseJwt(response.credential);

    const user = {
      snsId,
      snsType: 'google',
      imageURL:
        picture ||
        'https://user-images.githubusercontent.com/68373235/146498583-71b583f6-04d7-43be-b790-bbb264a95390.png',
    };

    try {
      const res = await axiosInstance.post('/users', user, {
        withCredentials: true,
      });
      const { AG3_JWT } = res.data.data;
      const myInfo = restructingMyInfo(res.data.data);

      setState('myInfo', myInfo);
      Cookies.set('AG3_JWT', AG3_JWT);
      this.$dom.classList.add('hidden');
      this.props.onLogin();
    } catch (e) {
      new Toast({ content: '로그인에 실패하였습니다' });
    }
  }

  addEvent = () => {
    const $modalContainer = this.$dom.querySelector('.login-modal-wrapper');

    this.$dom.addEventListener('click', e => {
      if (e.target.classList.contains('login-exit-btn')) {
        this.$dom.classList.add('hidden');
      }

      if (!$modalContainer.contains(e.target)) {
        this.$dom.classList.add('hidden');
      }
    });

    window.onGoogleLibraryLoad = () => {
      this.initGoogle();
    };
  };
}
