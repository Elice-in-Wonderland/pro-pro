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

// TODO: 리팩토링 및 개선점 찾아보기
export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    // 전송 시 보내야할 데이터
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

    if (props.childNodes[1]) props.replaceChild(this.$dom, props.childNodes[1]);
    else props.appendChild(this.$dom);
    // props.appendChild(this.$dom);

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
    console.log('데이터 관리:', this.data);
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
    const $btns = this.$dom.querySelector('.clearfix');
    // $btns.appendChild(this.$unsubscribeBtn.$dom);
    $btns.appendChild(this.$updateBtn.$dom);
    const $userImg = this.$dom.querySelector('.userImg');
    const $nickname = this.$dom.querySelector('.nickname');
    const $sidoSelect = this.$dom.querySelector('.sido-select');
    const $positionSelect = this.$dom.querySelector('.position-select');
    const $stackSelect = this.$dom.querySelector('.stack-select');
    const img = this.createDom('img', {
      src: this.data.imageURL,
      alt: 'profile',
    });
    $userImg.appendChild(img);
    const lab = this.createDom('label', {
      htmlFor: 'nickname',
    });
    const b = this.createDom('b', {
      innerText: '닉네임',
    });
    const inp = this.createDom('input', {
      type: 'text',
      id: 'nickname',
      className: 'nickname-input',
      value: this.data.nickname || '',
      placeholder: '닉네임을 입력하세요.',
    });
    lab.appendChild(b);
    $nickname.appendChild(lab);
    $nickname.appendChild(inp);

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
      const div = document.createElement('div');
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.classList.add('check-with-label');
      input.value = stack;
      input.id = stack;
      input.name = 'stacks';
      label.setAttribute('for', stack);
      label.classList.add('label-for-check');
      label.innerHTML = stack;

      if (this.data.stacks.indexOf(stack) !== -1) input.checked = true;
      div.appendChild(input);
      div.appendChild(label);
      fragment.appendChild(div);
    });
    $stackSelect.appendChild(fragment);

    this.addEvent();
  };

  sigunguChange(sido) {
    const $sigungu = document.querySelector('#sigungu');

    const selectedSido = defaultSigungu[sido];

    // sigungu reset
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

  submitProfileData = () => {
    console.log('프로필 업데이트 요청', this.data);
    axiosInstance
      .put(
        '/users',
        { ...this.data },
        {
          withCredentials: true,
        },
      )
      .then(data => this.getInitState());
  };

  checkEmptyField = () => {
    console.log('checkEmpty Field');
  };

  unsubscribeService = () => {
    console.log('회원 탈퇴는 아직 미구현');
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
