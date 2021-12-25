import axiosInstance from '../../utils/api';
import Component from '../../components/component';
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

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.data = {
      nickname: '',
      region: {
        sido: '',
        sigungu: '',
      },
      position: '',
      stacks: [],
      imageURL: '',
    };

    this.$dom = this.createDom('div', {
      className: 'profile-page-wrapper',
    });

    this.$updateBtn = new Button({
      className: 'updateBtn',
      buttonText: '수정 완료',
      onClick: this.submitProfileData,
    });

    // this.$unsubscribeBtn = new Button({
    //   className: 'unsubscribeBtn',
    //   buttonText: '회원 탈퇴',
    //   onClick: this.unsubscribeService,
    // });

    this.render();
    this.getInitState();
  }

  getInitState = async () => {
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

    this.setData(profile);
    this.render();
  };

  setData = nextData => {
    this.data = { ...this.data, ...nextData };
  };

  render = () => {
    this.$dom.innerHTML = `
        <div class="container">
            <div class="userImg">
            </div>
            <div class="form">
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
            </div>
        </div>
    `;

    this.appendRoot(this.props, this.$dom);

    const $btns = this.$dom.querySelector('.clearfix');
    // $btns.appendChild(this.$unsubscribeBtn.$dom);
    $btns.appendChild(this.$updateBtn.$dom);
    const $userImg = this.$dom.querySelector('.userImg');
    const $nickname = this.$dom.querySelector('.nickname');
    const $sidoSelect = this.$dom.querySelector('.sido-select');
    const $positionSelect = this.$dom.querySelector('.position-select');
    const $stackSelect = this.$dom.querySelector('.stack-select');

    if (this.data.imageURL === '') {
      $userImg.classList.add('profile-skeleton');
    } else {
      const $img = this.createDom('img', {
        src: this.data.imageURL,
        alt: 'profile',
        className: 'profile-img',
      });

      $userImg.appendChild($img);
    }

    const $lab = this.createDom('label', {
      htmlFor: 'nickname',
    });
    const $b = this.createDom('b', {
      innerText: '닉네임',
    });
    const $inp = this.createDom('input', {
      type: 'text',
      id: 'nickname',
      className: 'nickname-input',
      value: this.data.nickname || '',
      placeholder: '닉네임을 입력하세요.',
    });
    $lab.appendChild($b);
    $nickname.appendChild($lab);
    $nickname.appendChild($inp);

    let fragment = new DocumentFragment();
    defaultSido.forEach(sido => {
      const opt = this.createDom('option', {
        value: sido,
        innerHTML: sido,
      });
      if (sido === this.data.region.sido) opt.selected = true;
      fragment.appendChild(opt);
    });
    $sidoSelect.appendChild(fragment);
    this.sigunguChange(this.data.region.sido);

    fragment = new DocumentFragment();
    defaultPosition.forEach(position => {
      const opt = document.createElement('option');
      [opt.value, opt.innerHTML] = position;
      if (this.data.position === position[0]) opt.selected = true;
      fragment.appendChild(opt);
    });
    $positionSelect.appendChild(fragment);

    fragment = new DocumentFragment();
    defaultStacks.forEach(stack => {
      const $stack = new Stack({
        stack,
        selectedStack: this.data.stacks,
      });
      fragment.appendChild($stack.$dom);
    });
    $stackSelect.appendChild(fragment);

    this.addEvent();
  };

  sigunguChange(sido) {
    const $sigungu = document.querySelector('#sigungu');
    const selectedSido = defaultSigungu[sido];
    $sigungu.options.length = 1;

    // eslint-disable-next-line guard-for-in
    for (const property in selectedSido) {
      const opt = document.createElement('option');
      opt.value = selectedSido[property];
      opt.innerHTML = selectedSido[property];
      if (selectedSido[property] === this.data.region.sigungu) {
        opt.selected = true;
      }

      $sigungu.appendChild(opt);
    }
  }

  submitProfileData = async () => {
    const isFullField = this.checkEmptyField();
    if (isFullField) {
      try {
        await axiosInstance.put(
          '/users',
          { ...this.data },
          {
            withCredentials: true,
          },
        );
        new Toast({ content: '프로필 수정 성공' });
        RouterContext.state.replace('/');
      } catch (e) {
        new Toast({ content: '프로필 수정 실패', type: 'fail' });
      }
    }
  };

  checkEmptyField = () => {
    const { nickname, position, region, stacks } = this.data;
    if (nickname === '') {
      new Toast({ content: '닉네임을 입력하세요' });
      return false;
    }
    if (region.sido === '' || region.sigungu === '') {
      if (region.sido !== '세종특별자치시') {
        new Toast({ content: '지역을 입력하세요' });
        return false;
      }
    }
    if (position === '') {
      new Toast({ content: '직무를 선택하세요' });
      return false;
    }
    if (stacks.length === 0) {
      new Toast({ content: '하나 이상의 기술 스택을 선택하세요' });
      return false;
    }

    return true;
  };

  unsubscribeService = () => {
    console.log('탈퇴는 아직...');
  };

  addEvent = () => {
    const $nicknameInput = this.$dom.querySelector('.nickname-input');
    const $sidoSelect = this.$dom.querySelector('.sido-select');
    const $sigunguSelect = this.$dom.querySelector('.sigungu-select');
    const $positionSelect = this.$dom.querySelector('.position-select');
    const $stackSelect = this.$dom.querySelector('.stack-select');
    const stacks = document.querySelectorAll(
      'input[type=checkbox][name=stacks]',
    );

    $nicknameInput.addEventListener('input', () => {
      this.setData({ nickname: $nicknameInput.value });
    });

    $sidoSelect.addEventListener('change', e => {
      this.sigunguChange(e.target.value);
      this.setData({
        region: {
          sido: $sidoSelect.value,
          sigungu: '',
        },
      });
    });

    $sigunguSelect.addEventListener('change', () => {
      this.setData({
        region: {
          sido: $sidoSelect.value,
          sigungu: $sigunguSelect.value,
        },
      });
    });

    $positionSelect.addEventListener('change', () => {
      this.setData({ position: $positionSelect.value });
    });

    $stackSelect.addEventListener('change', () => {
      const checkedList = [...stacks].reduce((acc, stack) => {
        if (stack.checked) acc.push(stack.value);
        return acc;
      }, []);

      this.setData({
        stacks: checkedList,
      });
    });
  };
}
