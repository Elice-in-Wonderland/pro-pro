import {
  defaultPosition,
  defaultSido,
  defaultSigungu,
  defaultStacks,
} from '../../library/Profile';
import { createDom } from '../../utils/dom';
import CustomComponent from '../CustomComponent';
import Button from './Button';
import Stack from './Stack';

class Form extends CustomComponent {
  markup() {
    return `
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
    `;
  }

  renderCallback() {
    const btn = this.container.querySelector('.clearfix');
    const userImg = this.container.querySelector('.userImg');
    const nickname = this.container.querySelector('.nickname');
    const sidoSelect = this.container.querySelector('.sido-select');
    const positionSelect = this.container.querySelector('.position-select');
    const stackSelect = this.container.querySelector('.stack-select');

    if (this.props.userInfo.imageURL !== '') {
      this.$img = createDom('img', {
        src: this.props.userInfo.imageURL,
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
      value: this.props.userInfo.nickname || '',
      placeholder: '닉네임을 입력하세요.',
    });
    this.$sidos = new DocumentFragment();
    defaultSido.forEach(sido => {
      const opt = createDom('option', {
        value: sido,
        innerHTML: sido,
      });
      if (sido === this.props.userInfo.region.sido) opt.selected = true;
      this.$sidos.appendChild(opt);
    });
    this.$positions = new DocumentFragment();
    defaultPosition.forEach(position => {
      const opt = document.createElement('option');
      [opt.value, opt.innerHTML] = position;
      if (this.props.userInfo.position === position[0]) opt.selected = true;
      this.$positions.appendChild(opt);
    });

    const stacks = new DocumentFragment();

    defaultStacks.forEach(stack => {
      const div = createDom('div', {});
      new Stack({
        container: div,
        props: {
          stack,
          selectedStack: this.props.userInfo.stacks,
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

    if (this.props.userInfo.imageURL === '') {
      userImg.classList.add('profile-skeleton');
    } else {
      userImg.appendChild(this.$img);
    }

    if (this.props.userInfo.region.sido) {
      this.sigunguChange(this.props.userInfo.region.sido);
    }
  }

  setEvent() {
    const $nicknameInput = this.container.querySelector('.nickname-input');
    const $sidoSelect = this.container.querySelector('.sido-select');
    const $sigunguSelect = this.container.querySelector('.sigungu-select');
    const $positionSelect = this.container.querySelector('.position-select');
    const $stackSelect = this.container.querySelector('.stack-select');
    const stacks = this.container.querySelectorAll(
      'input[type=checkbox][name=stacks]',
    );

    this.container.addEventListener('submit', this.props.onSubmit);

    $nicknameInput.addEventListener('input', () => {
      this.props.onChangeUserInfo({
        ...this.props.userInfo,
        nickname: $nicknameInput.value,
      });
    });

    $sidoSelect.addEventListener('change', e => {
      this.props.onChangeUserInfo({
        ...this.props.userInfo,
        region: {
          sido: $sidoSelect.value,
          sigungu: '',
        },
      });

      this.sigunguChange($sidoSelect.value);
    });

    $sigunguSelect.addEventListener('change', () => {
      this.props.onChangeUserInfo({
        ...this.props.userInfo,
        region: {
          sido: $sidoSelect.value,
          sigungu: $sigunguSelect.value,
        },
      });
    });

    $positionSelect.addEventListener('change', () => {
      this.props.onChangeUserInfo({
        ...this.props.userInfo,
        position: $positionSelect.value,
      });
    });

    $stackSelect.addEventListener('change', () => {
      const checkedList = [...stacks].reduce((acc, stack) => {
        if (stack.checked) acc.push(stack.value);
        return acc;
      }, []);

      this.props.onChangeUserInfo({
        ...this.props.userInfo,
        stacks: checkedList,
      });
    });
  }

  sigunguChange(sido) {
    const sigungu = this.container.querySelector('#sigungu');
    const selectedSido = defaultSigungu[sido];
    sigungu.options.length = 1;

    // eslint-disable-next-line guard-for-in
    for (const property in selectedSido) {
      const opt = document.createElement('option');
      opt.value = selectedSido[property];
      opt.innerHTML = selectedSido[property];
      if (selectedSido[property] === this.props.userInfo.region.sigungu) {
        opt.selected = true;
      }

      sigungu.appendChild(opt);
    }
  }
}

export default Form;
