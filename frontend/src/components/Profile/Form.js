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
    return (
      <fragment>
        <div class="profile-edit__form__item">
          <div class="profile-edit__form__img-wrapper"></div>
        </div>

        <div class="profile-edit__form__item">
          <label for="nickname" class="profile-edit__form__label">
            <b>닉네임</b>
          </label>
          <input
            id="nickname"
            type="text"
            class="profile-edit__form__input profile-edit__form__input--nickname"
            value={this.props.userInfo.current.nickname || ''}
            placeholder="닉네임을 입력하세요."
          />
        </div>

        <div class="profile-edit__form__item">
          <label for="sido" class="profile-edit__form__label">
            <b>지역</b>
          </label>
          <div class="profile-edit__form__select-group">
            <select class="profile-edit__form__select" id="sido">
              <option value="">시/도</option>
            </select>
            <select class="profile-edit__form__select" id="sigungu">
              <option value="">시/군/구</option>
            </select>
          </div>
        </div>

        <div class="profile-edit__form__item">
          <label for="position" class="profile-edit__form__label">
            <b>직무</b>
          </label>
          <select class="profile-edit__form__select" id="position">
            <option value="">직무를 선택하세요</option>
          </select>
        </div>

        <div class="profile-edit__form__item">
          <label for="stack" class="profile-edit__form__label">
            <b>관심 기술 태그</b>
          </label>
          <div class="profile-edit__form--layout-grid" id="stack"></div>
        </div>

        <div class="profile-edit__form__item">
          <button
            class="profile-edit__form__btn profile-edit__form__btn--submit"
            aria-label="프로필 수정"
          >
            <span>수정 완료</span>
          </button>
        </div>
      </fragment>
    );
  }

  renderCallback() {
    const userImg = this.container.querySelector(
      '.profile-edit__form__img-wrapper',
    );
    const sidoSelect = this.container.querySelector('#sido');
    const positionSelect = this.container.querySelector('#position');
    const stackSelect = this.container.querySelector('#stack');

    if (this.props.userInfo.current.imageURL !== '') {
      const img = createDom('img', {
        src: this.props.userInfo.current.imageURL,
        className: 'profile-edit__form__img',
        alt: 'profile',
      });
      userImg.appendChild(img);
    } else {
      userImg.classList.add('profile-img-skeleton');
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
    this.container.addEventListener('input', ({ target }) => {
      if (target.classList.contains('profile-edit__form__input--nickname')) {
        this.props.onChangeUserInfo({
          nickname: target.value,
        });
      }
    });

    this.container.addEventListener('submit', this.props.onSubmit);
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
