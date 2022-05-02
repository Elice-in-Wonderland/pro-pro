import axiosInstance from '../../utils/api';
import Toast from '../../components/Toast/Toast';
import RouterContext from '../../router/RouterContext';
import CustomComponent from '../../components/CustomComponent';
import { createDom } from '../../utils/dom';
import Form from '../../components/Profile/Form';
import './profilePage.scss';

export default class ProfilePage extends CustomComponent {
  init() {
    this.nonReRenderState = {
      current: {
        nickname: '',
        region: {
          sido: '',
          sigungu: '',
        },
        position: '',
        stacks: new Set(),
        imageURL: '',
      },
    };
  }

  async mounted() {
    try {
      const {
        data: { data },
      } = await axiosInstance.get('/users', {
        withCredentials: true,
      });

      const profile = {
        nickname: data.nickname || '',
        region: {
          sido: data.region.sido || '',
          sigungu: data.region.sigungu || '',
        },
        position: data.position || '',
        stacks: new Set(data.stacks),
        imageURL: data.imageURL || '',
      };

      this.handleChangeUserInfo(profile);

      this.setState({
        ...this.state,
        ...profile,
      });
    } catch (e) {
      new Toast({ content: '프로필 정보 불러오기 실패', type: 'fail' });
    }
  }

  markup() {
    return `
      <div class="container">
      </div>
    `;
  }

  renderCallback() {
    const container = this.container.querySelector('.container');
    const form = createDom('form', { className: 'form' });

    new Form({
      container: form,
      props: {
        userInfo: this.nonReRenderState,
        onChangeUserInfo: this.handleChangeUserInfo.bind(this),
        onSubmit: this.handleSubmit.bind(this),
      },
    });

    container.appendChild(form);
  }

  handleChangeUserInfo(newUserInfo) {
    this.nonReRenderState.current = {
      ...this.nonReRenderState.current,
      ...newUserInfo,
    };
  }

  async handleSubmit(event) {
    event.preventDefault();
    const isFullField = this.checkEmptyField();

    if (!isFullField) return;

    try {
      await axiosInstance.put(
        '/users',
        { ...this.nonReRenderState.current },
        {
          withCredentials: true,
        },
      );
      new Toast({ content: '프로필 수정 성공' });
      RouterContext.state.replace('/');
    } catch (error) {
      new Toast({ content: '프로필 수정 실패', type: 'fail' });
    }
  }

  checkEmptyField() {
    const { nickname, position, region, stacks } =
      this.nonReRenderState.current;
    if (nickname === '') {
      new Toast({ content: '닉네임을 입력하세요', type: 'fail' });
      return false;
    }
    if (region.sido === '' || region.sigungu === '') {
      if (region.sido !== '세종특별자치시') {
        new Toast({ content: '지역을 입력하세요', type: 'fail' });
        return false;
      }
    }
    if (position === '') {
      new Toast({ content: '직무를 선택하세요', type: 'fail' });
      return false;
    }
    if (stacks.size === 0) {
      new Toast({
        content: '하나 이상의 기술 스택을 선택하세요',
        type: 'fail',
      });
      return false;
    }

    return true;
  }

  unsubscribeService() {
    console.log('탈퇴는 아직...');
  }
}
