import { createDom } from '@utils/dom';
import {
  defaultPosition,
  defaultSido,
  defaultSigungu,
  defaultStacks,
} from '../../library/Profile';
import CustomComponent from '../CustomComponent';
import SelectorBox from './SelectorBox';
import StackCheckBoxes from './StackCheckBoxes';
import './form.scss';

class Form extends CustomComponent {
  init() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStackChange = this.handleStackChange.bind(this);
  }

  markup() {
    return (
      <form class="form profile-edit__form" onSubmit={this.props.onSubmit}>
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
            onInput={this.handleInputChange}
          />
        </div>

        <div class="profile-edit__form__item">
          <label for="sido" class="profile-edit__form__label">
            <b>지역</b>
          </label>
          <div class="profile-edit__form__select-group">
            <div class="selector-container--sido"></div>
            <div class="selector-container--sigungu"></div>
          </div>
        </div>

        <div class="profile-edit__form__item">
          <label for="position" class="profile-edit__form__label">
            <b>직무</b>
          </label>
          <div class="selector-container--position"></div>
        </div>

        <div class="profile-edit__form__item">
          <label for="stack" class="profile-edit__form__label">
            <b>관심 기술 태그</b>
          </label>
          <div
            id="stack"
            class="profile-edit__form--layout-grid"
            onChange={this.handleStackChange}
          ></div>
        </div>

        <div class="profile-edit__form__item">
          <button
            class="profile-edit__form__btn profile-edit__form__btn--submit"
            aria-label="프로필 수정"
            disabled={this.props.isLoadFailed}
          >
            <span>수정 완료</span>
          </button>
        </div>
      </form>
    );
  }

  renderCallback() {
    const userImg = this.container.querySelector(
      '.profile-edit__form__img-wrapper',
    );
    const sidoContainer = this.container.querySelector(
      '.selector-container--sido',
    );
    const positionContainer = this.container.querySelector(
      '.selector-container--position',
    );
    const stackContainer = this.container.querySelector(
      '.profile-edit__form--layout-grid',
    );

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

    new SelectorBox({
      container: sidoContainer,
      props: {
        id: 'sido',
        defaultOption: '시/도',
        items: defaultSido,
        selectedItem: this.props.userInfo.current.region.sido,
        onChange: event => this.handleSidoChange(event),
      },
    });

    new SelectorBox({
      container: positionContainer,
      props: {
        id: 'position',
        defaultOption: '직무를 선택하세요',
        items: defaultPosition,
        selectedItem: this.props.userInfo.current.position,
        onChange: event => this.handlePositionChange(event),
      },
    });

    new StackCheckBoxes({
      container: stackContainer,
      props: {
        stacks: defaultStacks,
        selectedStacks: new Set(this.props.userInfo.current.stacks),
      },
    });

    this.handleSigunguUpdate(this.props.userInfo.current.region.sido);
  }

  handleInputChange({ target }) {
    if (target.classList.contains('profile-edit__form__input--nickname')) {
      this.props.onChangeUserInfo({
        nickname: target.value,
      });
    }
  }

  handleSigunguUpdate(selectedSido) {
    const sigunguSelect = this.container.querySelector(
      '.selector-container--sigungu',
    );
    const selectedSigungu = selectedSido ? defaultSigungu[selectedSido] : [];

    new SelectorBox({
      id: 'position',
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

  handlePositionChange(event) {
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
