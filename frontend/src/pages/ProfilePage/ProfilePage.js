import axiosInstance from '@utils/api';
import { createDom } from '@utils/dom';
import { updateUserInfo } from '@utils/auth';
import Toast from '../../components/Toast/Toast';
import RouterContext from '../../router/RouterContext';
import CustomComponent from '../../components/CustomComponent';
import Form from '../../components/Profile/Form';
import './profilePage.scss';
import WebRequestController from '../../router/WebRequestController';
import { isCanceledRequest } from '../../utils/common';

export default class ProfilePage extends CustomComponent {
  init() {
    this.state = {
      isLoadFailed: false,
    };

    this.nonReRenderState = {
      current: {
        nickname: '',
        region: {
          sido: '',
          sigungu: '',
        },
        position: '',
        stacks: [],
        imageURL: '',
      },
    };
  }

  async mounted() {
    try {
      const {
        data: { data },
      } = await axiosInstance.get('/users', {
        signal: WebRequestController.getController()?.signal,
      });

      const profile = {
        nickname: data.nickname || '',
        region: {
          sido: data.region.sido || '',
          sigungu: data.region.sigungu || '',
        },
        position: data.position || '',
        stacks: data.stacks,
        imageURL: data.imageURL || '',
      };

      this.handleChangeUserInfo(profile);

      this.setState({
        ...this.state,
        ...profile,
      });
    } catch (e) {
      if (isCanceledRequest(e)) return;

      new Toast({ content: '프로필 정보 불러오기 실패', type: 'fail' });
      this.setState({
        ...this.state,
        isLoadFailed: true,
      });
    }
  }

  markup() {
    return <div class="profile-edit"></div>;
  }

  renderCallback() {
    const container = this.container.querySelector('.profile-edit');
    const form = createDom('div', { className: 'form-container' });

    new Form({
      container: form,
      props: {
        userInfo: this.nonReRenderState,
        isLoadFailed: this.state?.isLoadFailed,
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
      await axiosInstance.put('/users', { ...this.nonReRenderState.current });

      updateUserInfo(this.nonReRenderState.current);
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
    if (stacks.length === 0) {
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
