import Component from '../../components/component';
import scss from './createPostPage.scss';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('div', {
      className: 'CreatePost',
    });
    this._props.$app.appendChild(this.$dom);
    this.render();
    this.addEvent();
  }

  //스택 추가
  appendStack() {
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
      'Fluter',
      'Etc',
    ];
    const stacks = this.$dom.querySelector('.Stacks').children[1];

    stackList.forEach((v, i, a) => {
      const stackLabel = this.createDom('label', {});
      const stackText = document.createTextNode(` ${v}`);
      const stackInput = this.createDom('input', {
        type: 'checkbox',
        name: 'stacks',
        value: v,
      });

      stackLabel.appendChild(stackInput);
      stackLabel.appendChild(stackText);
      stacks.appendChild(stackLabel);
    });
  }

  //지역 추가
  appendRegion() {
    const sidoList = ['서울시', '경기도', '제주도'];
    const sigunguList = ['송파구', '성남시', '서귀포시'];

    sidoList.forEach((v, i, a) => {
      const sidoInput = document.forms[0].sido;
      const sidoOption = this.createDom('option', { value: v });
      sidoOption.innerText = v;
      sidoInput.appendChild(sidoOption);
    });

    sigunguList.forEach((v, i, a) => {
      const sigunguInput = document.forms[0].sigungu;
      const sigunguOption = this.createDom('option', { value: v });
      sigunguOption.innerText = v;
      sigunguInput.appendChild(sigunguOption);
    });
  }

  //시작일 추가
  appendStartDate() {
    const startDateYear = document.forms[0].startDateYear;
    const startDateMonth = document.forms[0].startDateMonth;
    const startDateDate = document.forms[0].startDateDate;

    this.defaultDate(startDateYear, startDateMonth, startDateDate);
    this.transferData(
      startDateYear,
      startDateMonth,
      startDateDate,
      document.forms[0].startDate,
    );
  }

  //종료일 추가
  appendEndDate() {
    const endDateYear = document.forms[0].endDateYear;
    const endDateMonth = document.forms[0].endDateMonth;
    const endDateDate = document.forms[0].endDateDate;

    this.defaultDate(endDateYear, endDateMonth, endDateDate);
    this.transferData(
      endDateYear,
      endDateMonth,
      endDateDate,
      document.forms[0].endDate,
    );
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
    this.transferData(
      registerDeadlineYear,
      registerDeadlineMonth,
      registerDeadlineDate,
      document.forms[0].registerDeadline,
    );
  }

  //기본 날짜 표시
  defaultDate(_year, _month, _date) {
    let yearStart = new Date().getFullYear();
    let yearEnd = yearStart + 3;
    while (yearStart <= yearEnd) {
      const yearOption = this.createDom('option', { value: yearStart });
      yearOption.innerText = yearStart;
      _year.appendChild(yearOption);
      yearStart++;
    }

    let month = 1;
    while (month <= 12) {
      const monthOption = this.createDom('option', { value: month });
      monthOption.innerText = month;
      _month.appendChild(monthOption);
      month++;
    }

    let date = 1;
    while (date <= 31) {
      const dateOption = this.createDom('option', { value: date });
      dateOption.innerText = date;
      _date.appendChild(dateOption);
      date++;
    }
  }

  //년월에 따른 날짜갯수 변경
  dateAppendRemove(year, month, date) {
    const days = new Date(Number(year.value), Number(month.value), 0).getDate();
    const printed = date.children.length;

    if (printed > days) {
      while (date.children.length > days) {
        date.removeChild(date.lastElementChild);
      }
    } else if (printed < days) {
      const dateInput = document.forms[0].date;
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
  transferData(year, month, date, data) {
    let dataYear = year.value;
    let dataMonth = month.value;
    dataMonth = String(dataMonth).length !== 1 ? dataMonth : `0${dataMonth}`;

    let dataDate = date.value;
    dataDate = String(dataDate).length !== 1 ? dataDate : `0${dataDate}`;

    data.value = `${dataYear}-${dataMonth}-${dataDate}`;
  }

  render = () => {
    this.$dom.innerHTML = `
    <!-- 네비게이션 바 -->
    <form action="/write" method="POST">
        <div class='Category'>
            <h3>유형 선택</h3>
            <p>
                <label>
                    <input id="radio1" type="radio" name="category" value="project" checked>
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
            <input type="button" value="취 소">
            <input type="submit" value="등 록">
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
    startSelects.forEach(v => {
      v.addEventListener('change', e => {
        this.dateAppendRemove(
          startSelects[0],
          startSelects[1],
          startSelects[2],
        );
        this.transferData(
          startSelects[0],
          startSelects[1],
          startSelects[2],
          e.target.parentElement.lastElementChild,
        );
      });
    });
    //종료일
    endSelects.forEach(v => {
      v.addEventListener('change', e => {
        this.dateAppendRemove(endSelects[0], endSelects[1], endSelects[2]);
        this.transferData(
          endSelects[0],
          endSelects[1],
          endSelects[2],
          e.target.parentElement.lastElementChild,
        );
      });
    });
    //마감일
    registerDeadlineSelects.forEach(v => {
      v.addEventListener('change', e => {
        this.dateAppendRemove(
          registerDeadlineSelects[0],
          registerDeadlineSelects[1],
          registerDeadlineSelects[2],
        );
        this.transferData(
          registerDeadlineSelects[0],
          registerDeadlineSelects[1],
          registerDeadlineSelects[2],
          e.target.parentElement.lastElementChild,
        );
      });
    });
  };
}
