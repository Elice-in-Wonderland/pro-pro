import {
  defaultPosition,
  defaultSido,
  defaultSigungu,
  defaultStacks,
} from '../../library/Profile';
import { createDom } from '../../utils/dom';
import CustomComponent from '../CustomComponent';
import Selector from './Selector';
import Stack from './Stack';

class Form extends CustomComponent {
  markup() {
    return `
      <div class="userImg">
      </div>

      <div class="field nickname">
        <label for="nickname"><b>닉네임</b></label>
        <input type="text" id="nickname" class="nickname-input" value="${
          this.props.userInfo.current.nickname || ''
        }" placeholder="닉네임을 입력하세요."/>
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
        <button class="updateBtn">
          <span>수정 완료</span>
        </button>
      </div>
    `;
  }

  renderCallback() {
    const userImg = this.container.querySelector('.userImg');
    const sidoSelect = this.container.querySelector('.sido-select');
    const positionSelect = this.container.querySelector('.position-select');
    const stackSelect = this.container.querySelector('.stack-select');

    if (this.props.userInfo.current.imageURL !== '') {
      const img = createDom('img', {
        src: this.props.userInfo.current.imageURL,
        alt: 'profile',
      });
      userImg.appendChild(img);
    } else {
      userImg.classList.add('profile-skeleton');
    }

    new Selector({
      container: sidoSelect,
      props: {
        defaultOption: '시/도',
        items: defaultSido,
        selectedItem: this.props.userInfo.current.region.sido,
        onChange: event => this.handleSidoChange(event),
      },
    });

    new Selector({
      container: positionSelect,
      props: {
        defaultOption: '직무를 선택하세요',
        items: defaultPosition,
        selectedItem: this.props.userInfo.current.position,
        onChange: event => this.handlePostionChange(event),
      },
    });

    new Stack({
      container: stackSelect,
      props: {
        stacks: defaultStacks,
        selectedStacks: new Set(this.props.userInfo.current.stacks),
        onChange: event => this.handleStackChange(event),
      },
    });

    if (this.props.userInfo.current.region.sido) {
      this.handleSigunguUpdate(this.props.userInfo.current.region.sido);
    }
  }

  setEvent() {
    const nicknameInput = this.container.querySelector('.nickname-input');

    this.container.addEventListener('submit', this.props.onSubmit);

    nicknameInput.addEventListener('input', event => {
      this.props.onChangeUserInfo({
        nickname: event.target.value,
      });
    });
  }

  handleSigunguUpdate(selectedSido) {
    const sigunguSelect = this.container.querySelector('#sigungu');
    const selectedSigungu = defaultSigungu[selectedSido];
    sigunguSelect.options.length = 1;

    new Selector({
      container: sigunguSelect,
      props: {
        defaultOption: '시/군/구',
        items: selectedSigungu,
        selectedItem: this.props.userInfo.current.region.sigungu,
        onChange: event => this.handleSigunguChange(event),
      },
    });
  }

  handleSigunguChange(event) {
    this.props.onChangeUserInfo({
      region: {
        ...this.props.userInfo.current.region,
        sigungu: event.target.value,
      },
    });
  }

  handleSidoChange(event) {
    this.props.onChangeUserInfo({
      region: {
        sido: event.target.value,
        sigungu: '',
      },
    });

    this.handleSigunguUpdate(event.target.value);
  }

  handlePostionChange(event) {
    this.props.onChangeUserInfo({
      position: event.target.value,
    });
  }

  handleStackChange(event) {
    const nextStacks = new Set(this.props.userInfo.current.stacks);
    const selectedStack = event.target.value;

    if (nextStacks.has(selectedStack)) nextStacks.delete(selectedStack);
    else nextStacks.add(selectedStack);

    this.props.onChangeUserInfo({
      stacks: [...nextStacks],
    });
  }
}

export default Form;
