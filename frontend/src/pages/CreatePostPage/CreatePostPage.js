import axiosInstance from '@utils/api';
import { createPostCode } from '@utils/common';
import CustomComponent from '@/components/CustomComponent';
import './createPostPage.scss';
import { defaultStacks } from '@/library/Profile/index';
import RouterContext from '@/router/RouterContext';
import Toast from '@/components/Toast/Toast';

export default class CreatePostPage extends CustomComponent {
  // form validation
  checkform(formData) {
    if (formData.title.trim() === '') {
      new Toast({ content: '제목을 입력하세요', type: 'fail' });
      return false;
    }
    if (formData.executionPeriod[0] > formData.executionPeriod[1]) {
      new Toast({
        content: '수행 기간 종료일이 시작일보다 빠릅니다',
        type: 'fail',
      });
      return false;
    }
    if (formData.capacity < 0) {
      new Toast({
        content: '수행 인원을 확인하세요',
        type: 'fail',
      });
      return false;
    }
    if (formData.registerDeadline > formData.executionPeriod[0]) {
      new Toast({ content: '모집 마감일이 시작일 이후입니다', type: 'fail' });
      return false;
    }
    if (new Date(formData.registerDeadline) < new Date()) {
      new Toast({ content: '모집 마감일이 현재보다 빠릅니다', type: 'fail' });
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
    return (
      <div class="write">
        <div class="write__form">
          <div class="write__category">
            <h3 class="write__title">유형 선택</h3>
            <select class="write__select write__select--category" type="select">
              <option>프로젝트</option>
              <option>스터디</option>
            </select>
          </div>
          <div class="write__category">
            <h3 class="write__title">지역</h3>
            <div class="write__input-wrapper">
              <input type="text" class="write__input address-result" readonly />
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
            />
          </div>
          <div class="write__category">
            <h3 class="write__title">수행 인원</h3>
            <div class="write__input-wrapper">
              <input
                class="write__input write__input--capacity"
                id="count"
                type="text"
                name="capacity"
                value="1"
                maxLength="2/"
              ></input>
              <input class="write__btn" id="minus" type="button" value="-" />
              <input class="write__btn" id="plus" type="button" value="+" />
            </div>
          </div>
          <div class="write__category">
            <h3 class="write__title">수행 기간</h3>
            <h4 class="write__sub-title">시작일</h4>
            <input
              class="write__input write__date--start-date"
              type="date"
              name="startDate"
            />
            <h4 class="write__sub-title">종료일</h4>
            <input
              class="write__input write__date--end-date"
              type="date"
              name="endDate"
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
            />
          </div>
          <div class="write__category write__category--2x">
            <h3 class="write__title">내용</h3>
            <textarea
              class="write__textarea"
              name="content"
              placeholder="내용을 입력하세요"
            ></textarea>
          </div>
          <div class="write__category write__category--2x write__category--btns">
            <input
              class="write__btn"
              type="button"
              value="취 소"
              id="cancelBtn"
            />
            <input
              class="write__btn"
              type="button"
              value="등 록"
              id="sendBtn"
            />
          </div>
        </div>
      </div>
    );
  }

  // 스택 추가
  appendStack() {
    const stacks = document.querySelector('.write__stacks');
    stacks.innerHTML = defaultStacks
      .map(stack => {
        return `<div><input class="write__stack" type='checkbox' name='stacks' value=${stack} id=${stack}><label for=${stack}>${
          stack === 'cpp' ? 'c++' : stack
        }</label></input></div>`;
      })
      .join('');
  }

  renderCallback() {
    this.appendStack();
  }

  setEvent() {
    // 수행 인원 증감 이벤트
    const minusBtn = document.querySelector('#minus');
    const plusBtn = document.querySelector('#plus');
    const count = document.querySelector('#count');
    const addressSearch = document.querySelector('.address-search');
    const online = document.querySelector('.online');
    const addressResult = document.querySelector('.address-result');

    minusBtn.addEventListener('click', () => {
      if (count.value !== '1' && !count.value.includes('-')) {
        count.value = Number(count.value) - 1;
      }
    });
    plusBtn.addEventListener('click', () => {
      if (count.value !== '99') {
        count.value = Number(count.value) + 1;
      }
    });

    // 지역
    addressSearch.addEventListener('click', async () => {
      try {
        const region = await createPostCode();
        this.region = region;
        addressResult.value = region.address;
      } catch (e) {
        console.log(e);
      }
    });

    // 온라인
    online.addEventListener('click', async () => {
      this.region = {
        lat: '',
        lng: '',
        address: '',
        sido: '',
      };
      addressResult.value = '';
    });

    document.querySelector('#cancelBtn').addEventListener('click', () => {
      RouterContext.state.push('/');
    });

    document.querySelector('#sendBtn').addEventListener('click', async () => {
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
          await axiosInstance.post('/posts', formData, {
            withCredentials: true,
          });
          new Toast({
            content: '게시물이 성공적으로 등록되었습니다',
            type: 'success',
          });
          RouterContext.state.replace('/');
        } catch (error) {
          console.log(error);
          new Toast({
            content:
              '게시물이 정상적으로 등록되지 않았습니다. 관리자에게 문의하세요',
            type: 'fail',
          });
        }
      }
    });
  }
}
