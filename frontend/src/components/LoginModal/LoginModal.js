import Cookies from 'js-cookie';
import Component from '../component';
import './loginModal.scss';
import proproLogo from '../../assets/images/pro-pro.png';
import googleLogo from '../../assets/images/google-logo.svg';
import xButton from '../../assets/images/x-button.svg';
import axiosInstance from '../../utils/api';
import Toast from '../Toast/Toast';
import { setState } from '../../utils/store';

export default class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: 'modal-background hidden',
    });

    this.render();
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
                <div class="login-sns google">
                  <img class="login-btn" src="${googleLogo}" />
                  <div class="login-btn-text">Google로 로그인</div>
                </div>
              </div>
            </div>
        </div>
      `,
    );
    const initGoogle = () => {
      window.gapi?.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id: `${process.env.GOOGLE_API_KEY}.apps.googleusercontent.com`,
          cookiepolicy: 'single_host_origin',
        });
        auth2.attachClickHandler(
          document.querySelector('.login-btn'),
          {},
          async googleUser => {
            const user = {
              snsId: googleUser.yu.DW,
              snsType: 'google',
              imageURL:
                googleUser.yu.nN ||
                'https://user-images.githubusercontent.com/68373235/146498583-71b583f6-04d7-43be-b790-bbb264a95390.png',
            };
            try {
              const res = await axiosInstance.post('/users', user, {
                withCredentials: true,
              });
              const {
                _id,
                nickname,
                position,
                stacks,
                imageURL,
                sido,
                sigungu,
                AG3_JWT,
              } = res.data.data;
              const myInfo = {
                _id,
                nickname,
                position,
                stacks,
                imageURL,
                region: {
                  sido,
                  sigungu,
                },
                bookmarks: [],
              };
              setState('myInfo', myInfo);
              Cookies.set('AG3_JWT', AG3_JWT);
              this.$dom.classList.add('hidden');
              this.props.onLogin();
            } catch (e) {
              new Toast({ content: '로그인에 실패하였습니다' });
            }
          },
          error => {
            // console.log('창 닫음', error)
          },
        );
      });
    };

    window.addEventListener('load', () => {
      initGoogle();
    });

    this.addEvent();
  };

  displayModal = () => {
    this.$dom.classList.toggle('hidden');
  };

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
  };
}
