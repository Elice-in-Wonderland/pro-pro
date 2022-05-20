import axiosInstance from '@utils/api';
import { createPostCode } from '@utils/common';
import CustomComponent from '@/components/CustomComponent';
import './editPostPage.scss';
import { defaultStacks } from '@/library/Profile/index';
import WebRequestController from '@/router/WebRequestController';

import Loading from '@/components/Loading/Loading';
import RouterContext from '@/router/RouterContext';
import Toast from '@/components/Toast/Toast';

export default class EditPostPage extends CustomComponent {
  init() {
    this.state = {
      isLoading: true,
    };
    this.region = {};
  }

  mounted() {
    this.getPostInfo();
  }

  async getPostInfo() {
    const { postId } = RouterContext.state.params;
    try {
      const {
        data: { data },
      } = await axiosInstance(`/posts/${postId}`, {
        signal: WebRequestController.getController()?.signal,
      });
      console.log(data);
      this.setState({
        ...this.state,
        isLoading: false,
        ...data,
      });
      this.region = {
        lat: data.location.coordinates[0],
        lng: data.location.coordinates[1],
        address: data.address,
        sido: data.sido,
      };
    } catch (e) {
      console.log('요청이 취소되었습니다.');
    }
  }

  // 스택 추가
  appendStack() {
    const stacks = document.querySelector('.write__stacks');
    stacks.innerHTML = defaultStacks
      .map(stack => {
        return `<div>
          <input
            class="write__stack"
            type="checkbox"
            name="stacks"
            value=${stack}
            id=${stack}
            ${
              this.state.stacks.find(stateStack => stateStack === stack)
                ? 'checked'
                : ''
            }
          >
            <label for=${stack}>${stack === 'cpp' ? 'c++' : stack}</label>
          </input>
        </div>`;
      })
      .join('');
  }

  renderCallback() {
    if (this.state.isLoading) return;
    this.appendStack();
  }

  // form validation
  checkform(formData) {
    if (formData.title.trim() === '') {
      new Toast({
        content: '제목을 입력하세요',
        type: 'fail',
      });
      return false;
    }
    if (formData.executionPeriod[0] > formData.executionPeriod[1]) {
      new Toast({
        content: '수행 기간을 확인하세요',
        type: 'fail',
      });
      return false;
    }
    if (formData.stacks.length === 0) {
      new Toast({
        content: '하나 이상의 기술 스택을 선택하세요',
        type: 'fail',
      });
      return false;
    }
    if (formData.content.trim() === '') {
      new Toast({
        content: '내용을 입력하세요',
        type: 'fail',
      });
      return false;
    }
  }

  markup() {
    if (this.state.isLoading) return Loading();
    const {
      category,
      address,
      registerDeadline,
      capacity,
      startDate,
      endDate,
      title,
      content,
    } = this.state;
    return (
      <div class="write" onClick={this.clickHandler.bind(this)}>
        <div class="write__form">
          <div class="write__category">
            <h3 class="write__title">유형 선택</h3>
            <select class="write__select write__select--category" type="select">
              {category === 'study' ? (
                <fragment>
                  <option selected>스터디</option>
                  <option>프로젝트</option>
                </fragment>
              ) : (
                <fragment>
                  <option selected>프로젝트</option>
                  <option>스터디</option>
                </fragment>
              )}
            </select>
          </div>
          <div class="write__category">
            <h3 class="write__title">지역</h3>
            <div class="write__input-wrapper">
              <input
                type="text"
                class="write__input address-result"
                value={address}
                readonly
              />
              <input
                type="button"
                class="write__btn address-search"
                value="주소검색"
              />
              <input type="button" class="write__btn online" value="온라인" />
            </div>
          </div>
          <div class="write__category">
            <h3 class="write__title">모집 마감일</h3>
            <input
              class="write__input write__date--register-end-date"
              type="date"
              name="registerDeadline"
              value={registerDeadline.slice(0, 10)}
            />
          </div>
          <div class="write__category">
            <h3 class="write__title">수행 인원</h3>
            <div class="write__input-wrapper">
              <input
                class="write__input write__input--capacity"
                type="text"
                name="capacity"
                value={capacity}
                maxLength="2/"
              ></input>
              <input
                class="write__btn write__btn--minus"
                type="button"
                value="-"
              />
              <input
                class="write__btn write__btn--plus"
                type="button"
                value="+"
              />
            </div>
          </div>
          <div class="write__category">
            <h3 class="write__title">수행 기간</h3>
            <h4 class="write__sub-title">시작일</h4>
            <input
              class="write__input write__date--start-date"
              type="date"
              name="startDate"
              value={startDate.slice(0, 10)}
            />
            <h4 class="write__sub-title">종료일</h4>
            <input
              class="write__input write__date--end-date"
              type="date"
              name="endDate"
              value={endDate.slice(0, 10)}
            />
          </div>
          <div class="write__category">
            <h3 class="write__title">기술 스택 및 협업 툴</h3>
            <div class="write__stacks"></div>
          </div>
          <div class="write__category write__category--2x">
            <h3 class="write__title">제목</h3>
            <input
              class="write__input write__input--title"
              type="text"
              name="title"
              maxLength="50"
              placeholder="제목을 입력하세요"
              value={title}
            />
          </div>
          <div class="write__category write__category--2x">
            <h3 class="write__title">내용</h3>
            <textarea
              class="write__textarea"
              name="content"
              placeholder="내용을 입력하세요"
            >
              {content}
            </textarea>
          </div>
          <div class="write__category write__category--2x write__category--btns">
            <input
              class="write__btn write__btn--cancel"
              type="button"
              value="취 소"
            />
            <input
              class="write__btn write__btn--edit"
              type="button"
              value="등 록"
            />
          </div>
        </div>
      </div>
    );
  }

  async clickHandler({ target }) {
    if (target.classList.contains('write__btn--minus')) {
      const count = document.querySelector('.write__input--capacity');
      if (count.value !== '1' && !count.value.includes('-')) {
        count.value = Number(count.value) - 1;
      }
    }

    if (target.classList.contains('write__btn--plus')) {
      const count = document.querySelector('.write__input--capacity');
      if (count.value !== '99') {
        count.value = Number(count.value) + 1;
      }
    }

    if (target.classList.contains('address-search')) {
      try {
        const addressResult = document.querySelector('.address-result');
        const region = await createPostCode();
        this.region = region;
        addressResult.value = region.address;
      } catch (e) {
        console.log(e);
      }
    }

    if (target.classList.contains('online')) {
      const addressResult = document.querySelector('.address-result');
      this.region = {
        lat: '',
        lng: '',
        address: '',
        sido: '',
      };
      addressResult.value = '';
    }

    if (target.classList.contains('write__btn--cancel')) {
      const { postId } = RouterContext.state.params;
      RouterContext.state.push(`/detail/${postId}`);
    }

    if (target.classList.contains('write__btn--edit')) {
      const category =
        document.querySelector('.write__select--category').options[
          document.querySelector('.write__select--category').selectedIndex
        ].text === '프로젝트'
          ? 'project'
          : 'study';
      const title = document.querySelector('.write__input--title').value;
      const content = document.querySelector('.write__textarea').value;
      const stacks = Array.from(document.querySelectorAll('.write__stack'))
        .filter(stack => stack.checked === true)
        .map(stack => stack.value);
      const capacity = Number(
        document.querySelector('.write__input--capacity').value,
      );
      const executionPeriod = [
        document.querySelector('.write__date--start-date').value,
        document.querySelector('.write__date--end-date').value,
      ];
      const registerDeadline = document.querySelector(
        '.write__date--register-end-date',
      ).value;

      const formData = {
        category,
        title,
        content,
        stacks,
        capacity,
        region: this.region,
        executionPeriod,
        registerDeadline,
      };
      if (this.checkform(formData) !== false) {
        try {
          const { postId } = RouterContext.state.params;
          await axiosInstance.put(`/posts/${postId}`, formData, {
            withCredentials: true,
          });
          new Toast({
            content: '게시물이 성공적으로 수정됬습니다.',
            type: 'success',
          });
          RouterContext.state.replace(`/detail/${postId}`);
        } catch (error) {
          console.log(error);
          new Toast({
            content: '게시물이 정상적으로 등록되지 않았습니다.',
            type: 'fail',
          });
        }
      }
    }
  }
}
