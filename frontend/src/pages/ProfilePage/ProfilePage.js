import axiosInstance from '../../utils/api';
import './profilePage.scss';
import {
  defaultSigungu,
  defaultSido,
  defaultPosition,
  defaultStacks,
} from '../../library/Profile';
import Button from '../../components/Profile/Button';
import Stack from '../../components/Profile/Stack';
import Toast from '../../components/Toast/Toast';
import RouterContext from '../../router/RouterContext';
import CustomComponent from '../../components/CustomComponent';
import { createDom } from '../../utils/dom';

export default class ProfilePage extends CustomComponent {
  init() {
    this.nonReRenderState = {
      nickname: '',
      region: {
        sido: '',
        sigungu: '',
      },
      position: '',
      stacks: [],
      imageURL: '',
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
        stacks: data.stacks,
        imageURL: data.imageURL || '',
      };

      this.nonReRenderState = {
        ...this.nonReRenderState,
        ...profile,
      };

      this.setState({
        ...this.state,
        ...profile,
      });
    } catch (e) {
      new Toast({ content: '프로필 정보 불러오기 실패', type: 'fail' });
    }
  }

  renderCallback() {
    console.log('re-render');
    const btn = this.container.querySelector('.clearfix');
    const userImg = this.container.querySelector('.userImg');
    const nickname = this.container.querySelector('.nickname');
    const sidoSelect = this.container.querySelector('.sido-select');
    const positionSelect = this.container.querySelector('.position-select');
    const stackSelect = this.container.querySelector('.stack-select');

    if (this.nonReRenderState.imageURL !== '') {
      this.$img = createDom('img', {
        src: this.nonReRenderState.imageURL,
        alt: 'profile',
      });
    }
    this.$lab = createDom('label', {
      htmlFor: 'nickname',
    });
    this.$b = createDom('b', {
      innerText: '닉네임',
    });
    this.$inp = createDom('input', {
      type: 'text',
      id: 'nickname',
      className: 'nickname-input',
      value: this.nonReRenderState.nickname || '',
      placeholder: '닉네임을 입력하세요.',
    });
    this.$sidos = new DocumentFragment();
    defaultSido.forEach(sido => {
      const opt = createDom('option', {
        value: sido,
        innerHTML: sido,
      });
      if (sido === this.nonReRenderState.region.sido) opt.selected = true;
      this.$sidos.appendChild(opt);
    });
    this.$positions = new DocumentFragment();
    defaultPosition.forEach(position => {
      const opt = document.createElement('option');
      [opt.value, opt.innerHTML] = position;
      if (this.nonReRenderState.position === position[0]) opt.selected = true;
      this.$positions.appendChild(opt);
    });

    const stacks = new DocumentFragment();

    defaultStacks.forEach(stack => {
      const div = createDom('div', {});
      new Stack({
        container: div,
        props: {
          stack,
          selectedStack: this.nonReRenderState.stacks,
        },
      });
      stacks.appendChild(div);
    });

    const submitBtn = createDom('button', {
      className: 'updateBtn',
    });

    new Button({
      container: submitBtn,
      props: {
        buttonText: '수정 완료',
      },
    });

    btn.appendChild(submitBtn);
    this.$lab.appendChild(this.$b);
    nickname.appendChild(this.$lab);
    nickname.appendChild(this.$inp);
    sidoSelect.appendChild(this.$sidos);
    positionSelect.appendChild(this.$positions);
    stackSelect.appendChild(stacks);

    if (this.nonReRenderState.imageURL === '') {
      userImg.classList.add('profile-skeleton');
    } else {
      userImg.appendChild(this.$img);
    }
    if (this.nonReRenderState.region.sido) {
      this.sigunguChange(this.nonReRenderState.region.sido);
    }
  }

  markup() {
    return `
      <div class="profile-page-wrapper">
        <div class="container">
          <form class="form">
            <div class="userImg">
            </div>

            <div class="field nickname">
            </div>

            <div class="field">
              <label for="sido"><b>지역</b></label>
              <select class="sido-select" id="sido">
                <option value="">시/도</option>
              </select>
              <select class="sigungu-select" id="sigungu">
                <option value="">시/군/구</option>
              </select>
            </div>

            <div class="field">       
              <label for="position"><b>직무</b></label>
              <select class="position-select" id="position">
                <option value="">직무를 선택하세요</option>
              </select>
            </div>

            <div class="field">
              <label for="stack"><b>관심 기술 태그</b></label>
              <div class="stack-select" id="stack">
              </div>
            </div>
            
            <div class="clearfix">
            </div>
          </form>
        </div>
      </div>
    `;
  }

  sigunguChange(sido) {
    const sigungu = document.querySelector('#sigungu');
    const selectedSido = defaultSigungu[sido];
    sigungu.options.length = 1;

    // eslint-disable-next-line guard-for-in
    for (const property in selectedSido) {
      const opt = document.createElement('option');
      opt.value = selectedSido[property];
      opt.innerHTML = selectedSido[property];
      if (selectedSido[property] === this.nonReRenderState.region.sigungu) {
        opt.selected = true;
      }

      sigungu.appendChild(opt);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const isFullField = this.checkEmptyField();
    if (isFullField) {
      try {
        await axiosInstance.put(
          '/users',
          { ...this.nonReRenderState },
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
  }

  checkEmptyField() {
    const { nickname, position, region, stacks } = this.nonReRenderState;
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

  setEvent() {
    const $nicknameInput = this.container.querySelector('.nickname-input');
    const $sidoSelect = this.container.querySelector('.sido-select');
    const $sigunguSelect = this.container.querySelector('.sigungu-select');
    const $positionSelect = this.container.querySelector('.position-select');
    const $stackSelect = this.container.querySelector('.stack-select');
    const stacks = document.querySelectorAll(
      'input[type=checkbox][name=stacks]',
    );
    const form = this.container.querySelector('.form');

    form.addEventListener('submit', this.handleSubmit.bind(this));

    $nicknameInput.addEventListener('input', () => {
      this.nonReRenderState = {
        ...this.nonReRenderState,
        nickname: $nicknameInput.value,
      };
    });

    $sidoSelect.addEventListener('change', e => {
      this.nonReRenderState = {
        ...this.nonReRenderState,
        region: {
          sido: $sidoSelect.alue,
          sigungu: '',
        },
      };

      this.sigunguChange($sidoSelect.value);
    });

    $sigunguSelect.addEventListener('change', () => {
      this.nonReRenderState = {
        ...this.nonReRenderState,
        region: {
          sido: $sidoSelect.alue,
          sigungu: $sigunguSelect.value,
        },
      };
    });

    $positionSelect.addEventListener('change', () => {
      this.nonReRenderState = {
        ...this.nonReRenderState,
        position: $positionSelect.value,
      };
    });

    $stackSelect.addEventListener('change', () => {
      const checkedList = [...stacks].reduce((acc, stack) => {
        if (stack.checked) acc.push(stack.value);
        return acc;
      }, []);

      this.nonReRenderState = {
        ...this.nonReRenderState,
        stacks: checkedList,
      };
    });
  }
}
