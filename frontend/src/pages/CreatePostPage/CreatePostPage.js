import Component from '../../components/component';
import scss from './createPostPage.scss';
import { defaultStacks } from '../../library/Profile/index';
import axiosInstance from '../../utils/api';
import { createPostCode } from '../../utils/common';

export default class CreatePostPage extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('div', {
      className: 'CreatePostPage',
    });
    // props.appendChild(this.$dom);
    this.region = {};
    this.appendRoot(props, this.$dom);
    this.render();
    this.addEvent();
  }

  // 스택 추가
  appendStack() {
    const stacks = document.querySelector('.Stacks p');

    stacks.innerHTML = defaultStacks
      .map(stack => {
        return `<input type='checkbox' name='stacks' value=${stack} id=${stack}><span>✔︎</span><label for=${stack}>${
          stack === 'cpp' ? 'c++' : stack
        }</label>`;
      })
      .join('');
  }

  // 시작일 추가
  appendStartDate() {
    const { startDateYear, startDateMonth, startDateDate } = document.forms[0];

    this.defaultDate(startDateYear, startDateMonth, startDateDate);
    this.transferData([
      startDateYear,
      startDateMonth,
      startDateDate,
      document.forms[0].startDate,
    ]);
  }

  // 종료일 추가
  appendEndDate() {
    const { endDateYear, endDateMonth, endDateDate } = document.forms[0];

    this.defaultDate(endDateYear, endDateMonth, endDateDate);
    this.transferData([
      endDateYear,
      endDateMonth,
      endDateDate,
      document.forms[0].endDate,
    ]);
  }

  // 마감일 추가
  appendRegisterDeadline() {
    const {
      registerDeadlineYear,
      registerDeadlineMonth,
      registerDeadlineDate,
    } = document.forms[0];

    this.defaultDate(
      registerDeadlineYear,
      registerDeadlineMonth,
      registerDeadlineDate,
    );
    this.transferData([
      registerDeadlineYear,
      registerDeadlineMonth,
      registerDeadlineDate,
      document.forms[0].registerDeadline,
    ]);
  }

  // 기본 날짜 표시
  defaultDate(dfYear, dfMonth, dfDate) {
    let yearStart = new Date().getFullYear();
    const yearEnd = yearStart + 3;
    let years = '';
    let months = '';
    let dates = '';
    while (yearStart <= yearEnd) {
      years += `<option value=${yearStart}>${yearStart}</option>`;
      yearStart++;
    }
    dfYear.innerHTML = years;

    let month = 1;
    while (month <= 12) {
      months += `<option value=${month}>${month}</option>`;
      month++;
    }
    dfMonth.innerHTML = months;

    let date = 1;
    while (date <= 31) {
      dates += `<option value=${date}>${date}</option>`;
      date++;
    }
    dfDate.innerHTML = dates;
  }

  // 년월에 따른 날짜갯수 변경
  dateAppendRemove([year, month, date]) {
    const days = new Date(Number(year.value), Number(month.value), 0).getDate();
    const printed = date.children.length;

    if (printed > days) {
      while (date.children.length > days) {
        date.removeChild(date.lastElementChild);
      }
    }
    if (printed < days) {
      let addPrinted = printed + 1;
      while (date.children.length < days) {
        const dateOption = this.createDom('option', { value: addPrinted });
        dateOption.innerText = addPrinted;
        date.appendChild(dateOption);
        addPrinted++;
      }
    }
  }

  // 서버 전송을 위한 date폼에 data입력
  transferData([year, month, date, data]) {
    let dataMonth = month.value;
    dataMonth = dataMonth.length !== 1 ? dataMonth : `0${dataMonth}`;

    let dataDate = date.value;
    dataDate = dataDate.length !== 1 ? dataDate : `0${dataDate}`;

    data.value = `${year.value}-${dataMonth}-${dataDate}`;
  }

  // form validation
  checkform(formData) {
    if (formData.title.trim() === '') {
      alert('제목을 입력하세요');
      return false;
    }
    if (formData.executionPeriod[0] > formData.executionPeriod[1]) {
      alert('수행 기간을 확인하세요');
      return false;
    }
    if (formData.stacks.length === 0) {
      alert('하나 이상의 기술 스택을 선택하세요');
      return false;
    }
    if (formData.content.trim() === '') {
      alert('내용을 입력하세요');
      return false;
    }
  }

  render = () => {
    this.$dom.innerHTML = `
    <form>
        <div class='Category'>
            <h3>유형 선택</h3>
            <p>
              <input type="radio" name="category" value="project" id="project" checked>
              <span>●</span>
              <label for="project">PROJECT</label>
              <input type="radio" name="category" value="study" id="study">
              <span>●</span>
              <label for="study">STUDY</label>
            </p>
        </div>
        <div class='Title'>
            <h3>제목</h3>
            <p>
                <input type="text" name="title" maxlength='50'>
            </p>
        </div>
        <div class='Region'>
            <h3>지역</h3>
            <p>
              <input type="text" class='addressResult' readonly>
              <input type="button" class='addressSearch' value="주소검색"><br>
            </p>
        </div>
        <div class='Period'>
            <h3>수행 기간</h3>
            <p>
                <label id="periodFrom">FROM&nbsp&nbsp
                  <select name="startDateYear"></select>
                  <select name="startDateMonth"></select>
                  <select name="startDateDate"></select>
                  <input type="date" name="startDate">
                </label>
                <label id="periodTo">TO&nbsp&nbsp
                  <select name="endDateYear"></select>
                  <select name="endDateMonth"></select>
                  <select name="endDateDate"></select>
                  <input type="date" name="endDate">
                </label>
            </p>
        </div>
        <div class='Capacity'>
            <h3>수행 인원</h3>
            <p>
                <input id="minus" type="button" value="-">
                <input id="count" type="text" name="capacity" value=1 maxlength='2'></input>
                <input id="plus" type="button" value="+">
            </p>
        </div>
        <div class='RegisterDeadline'>
            <h3>모집 마감일</h3>
            <p id="registerDeadline">
                <select name="registerDeadlineYear"></select>
                <select name="registerDeadlineMonth"></select>
                <select name="registerDeadlineDate"></select>
                <input type="date" name="registerDeadline">
            </p>
        </div>
        <div class='Stacks'>
            <h3>기술 스택 및 협업 툴</h3>
            <p>
            </p>
        </div>
        <div class="Content">
            <textarea name="content"cols="86" rows="15" placeholder="내용을 입력하세요"></textarea>
        </div>
        <div class="Btns">
            <input type="button" value="취 소" id="cancelBtn">
            <input type="button" value="등 록" id="sendBtn">
        </div>
    </form>
    `;
    this.appendStack();
    this.appendStartDate();
    this.appendEndDate();
    this.appendRegisterDeadline();
  };

  addEvent = () => {
    // 수행 인원 증감 이벤트
    const minusBtn = document.querySelector('#minus');
    const plusBtn = document.querySelector('#plus');
    const count = document.querySelector('#count');
    const addressSearch = document.querySelector('.addressSearch');
    const addressResult = document.querySelector('.addressResult');

    minusBtn.addEventListener('click', () => {
      if (count.value !== '1') {
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

    // 년월에 따른 일 변경, 서버 전송을 위한 date폼 data변경
    const periodFrom = document.querySelector('#periodFrom');
    const periodTo = document.querySelector('#periodTo');
    const registerDeadline = document.querySelector('#registerDeadline');

    // 사작일
    periodFrom.addEventListener('change', () => {
      this.dateAppendRemove(periodFrom.querySelectorAll('select'));
      this.transferData(periodFrom.children);
    });

    // 종료일
    periodTo.addEventListener('change', () => {
      this.dateAppendRemove(periodTo.querySelectorAll('select'));
      this.transferData(periodTo.children);
    });

    // 마감일
    registerDeadline.addEventListener('change', () => {
      this.dateAppendRemove(registerDeadline.querySelectorAll('select'));
      this.transferData(registerDeadline.children);
    });

    document.querySelector('#sendBtn').addEventListener('click', async () => {
      const formData = {
        category: Array.from(
          document.querySelectorAll('input[type="radio"]'),
        ).filter(category => category.checked === true)[0].value,
        title: document.forms[0].title.value,
        content: document.forms[0].content.value,
        stacks: Array.from(document.forms[0].stacks)
          .filter(stack => stack.checked === true)
          .map(stack => stack.value),
        capacity: Number(document.forms[0].capacity.value),
        region: this.region,
        executionPeriod: [
          document.forms[0].startDate.value,
          document.forms[0].endDate.value,
        ],
        registerDeadline: document.forms[0].registerDeadline.value,
      };
      console.log(formData);
      if (this.checkform(formData) !== false) {
        try {
          const posts = await axiosInstance.post('/posts', formData, {
            withCredentials: true,
          });
        } catch (error) {
          console.log(error);
          alert('정상적으로 등록되지 않았습니다. 다시 시도해주세요.');
        }
      }
    });
  };
}
