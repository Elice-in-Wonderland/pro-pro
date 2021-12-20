import Component from '../../components/component';
import scss from './createPostPage.scss';
import axios from 'axios';

const stackList = [
  'Javascript',
  'React.js',
  'Node.js',
  'Vue.js',
  'C',
  'C++',
  'C#',
  'Typescript.js',
  'Kotlin',
  'Django',
  'Go',
  'Swift',
  'Java',
  'Spring',
  'Flutter',
  'Etc',
];
const sidoList = ['서울시', '경기도', '제주도'];
const sigunguList = ['송파구', '성남시', '서귀포시'];

export default class CreatePostPage extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('div', {
      className: 'CreatePost',
    });
    props.appendChild(this.$dom);
    this.render();
    this.addEvent();
  }

  //스택 추가
  appendStack() {
    const stacks = document.querySelector('.Stacks p');

    stacks.innerHTML = stackList
      .map(stack => {
        return `<label><input type='checkbox' name='stacks' value=${stack}> ${stack}</label>`;
      })
      .join('');
  }

  //지역 추가
  appendRegion() {
    const sido = document.forms[0].sido;
    const sigungu = document.forms[0].sigungu;

    sido.innerHTML = sidoList
      .map(sido => {
        return `<option value=${sido}>${sido}</option>`;
      })
      .join('');

    sigungu.innerHTML = sigunguList
      .map(sigungu => {
        return `<option value=${sigungu}>${sigungu}</option>`;
      })
      .join('');
  }

  //시작일 추가
  appendStartDate() {
    const startDateYear = document.forms[0].startDateYear;
    const startDateMonth = document.forms[0].startDateMonth;
    const startDateDate = document.forms[0].startDateDate;

    this.defaultDate(startDateYear, startDateMonth, startDateDate);
    this.transferData([
      startDateYear,
      startDateMonth,
      startDateDate,
      document.forms[0].startDate,
    ]);
  }

  //종료일 추가
  appendEndDate() {
    const endDateYear = document.forms[0].endDateYear;
    const endDateMonth = document.forms[0].endDateMonth;
    const endDateDate = document.forms[0].endDateDate;

    this.defaultDate(endDateYear, endDateMonth, endDateDate);
    this.transferData([
      endDateYear,
      endDateMonth,
      endDateDate,
      document.forms[0].endDate,
    ]);
  }

  //마감일 추가
  appendRegisterDeadline() {
    const registerDeadlineYear = document.forms[0].registerDeadlineYear;
    const registerDeadlineMonth = document.forms[0].registerDeadlineMonth;
    const registerDeadlineDate = document.forms[0].registerDeadlineDate;

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

  //기본 날짜 표시
  defaultDate(dfYear, dfMonth, dfDate) {
    let yearStart = new Date().getFullYear();
    let yearEnd = yearStart + 3;
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

  //년월에 따른 날짜갯수 변경
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

  //서버 전송을 위한 date폼에 data입력
  transferData([year, month, date, data]) {
    let dataMonth = month.value;
    dataMonth = dataMonth.length !== 1 ? dataMonth : `0${dataMonth}`;

    let dataDate = date.value;
    dataDate = dataDate.length !== 1 ? dataDate : `0${dataDate}`;

    data.value = `${year.value}-${dataMonth}-${dataDate}`;
  }

  render = () => {
    this.$dom.innerHTML = `
    <!-- 네비게이션 바 -->
    <form>
        <div class='Category'>
            <h3>유형 선택</h3>
            <p>
                <label>
                    <input type="radio" name="category" value="project" checked>
                    PROJECT
                </label>
                <label>
                    <input type="radio" name="category" value="study">
                    STUDY
                </label>
            </p>
        </div>
        <div class='Title'>
            <h3>제목</h3>
            <p>
                <input type="text" name="title">
            </p>
        </div>
        <div class='Region'>
            <h3>지역</h3>
            <p>
                <select name="sido"></select>
                <select name="sigungu"></select>
            </p>
        </div>
        <div class='Period'>
            <h3>수행 기간</h3>
            <p>
                <label>FROM&nbsp&nbsp
                  <select name="startDateYear"></select>
                  <select name="startDateMonth"></select>
                  <select name="startDateDate"></select>
                  <input type="date" name="startDate">
                </label>
                <label>TO&nbsp&nbsp
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
                <input id="count" type="text" name="capacity" value=1></input>
                <input id="plus" type="button" value="+">
            </p>
        </div>
        <div class='RegisterDeadline'>
            <h3>모집 마감일</h3>
            <p>
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
    this.appendRegion();
    this.appendStartDate();
    this.appendEndDate();
    this.appendRegisterDeadline();
  };

  addEvent = () => {
    //수행 인원 증감 이벤트
    const minusBtn = document.querySelector('#minus');
    const plusBtn = document.querySelector('#plus');
    const count = document.querySelector('#count');

    minusBtn.addEventListener('click', () => {
      if (count.value !== '1') {
        count.value = Number(count.value) - 1;
      }
    });
    plusBtn.addEventListener('click', () => {
      count.value = Number(count.value) + 1;
    });

    //년월에 따른 일 변경, 서버 전송을 위한 date폼 data변경
    const periodSelects = document.querySelectorAll('.Period select');
    const startSelects = Array.from(periodSelects).slice(0, 3);
    const endSelects = Array.from(periodSelects).slice(3);
    const registerDeadlineSelects = Array.from(
      document.querySelectorAll('.RegisterDeadline select'),
    );

    //사작일
    startSelects.forEach(startSelect => {
      startSelect.addEventListener('change', () => {
        this.dateAppendRemove(startSelects);
        this.transferData([...startSelects, document.forms[0].startDate]);
      });
    });
    //종료일
    endSelects.forEach(endSelect => {
      endSelect.addEventListener('change', () => {
        this.dateAppendRemove(endSelects);
        this.transferData([...endSelects, document.forms[0].endDate]);
      });
    });
    //마감일
    registerDeadlineSelects.forEach(registerDeadlineSelect => {
      registerDeadlineSelect.addEventListener('change', () => {
        this.dateAppendRemove(registerDeadlineSelects);
        this.transferData([
          ...registerDeadlineSelects,
          document.forms[0].registerDeadline,
        ]);
      });
    });
  };
}
