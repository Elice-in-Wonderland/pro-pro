import Component from '../../components/component';
import scss from './createPostPage.scss';
import axios from 'axios';

export default class CreatePostPage extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('div', {
      className: 'CreatePostPage',
    });
    props.appendChild(this.$dom);
    this.render();
    this.addEvent();
  }

  //스택 추가
  appendStack() {
    const stacks = document.querySelector('.Stacks p');

    stacks.innerHTML = defaultStacks
      .map(stack => {
        return `<label><input type='checkbox' name='stacks' value=${stack}> ${
          stack === 'cpp' ? 'c++' : stack
        }</label>`;
      })
      .join('');
  }

  //지역 추가
  appendRegion() {
    const sido = document.forms[0].sido;
    const sigungu = document.forms[0].sigungu;

    sido.innerHTML = Object.keys(defaultSigungu)
      .map(sido => {
        return `<option value=${sido}>${sido}</option>`;
      })
      .join('');

    sigungu.innerHTML = defaultSigungu.강원도
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
            <a href="/"><input type="button" value="취 소" id="cancelBtn"></a>
            <a href="/"><input type="button" value="등 록" id="sendBtn"></a>
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

    //시도 선택에 따른 시군구 변경
    document.forms[0].sido.addEventListener('change', e => {
      let selectedSido = e.target.value;
      document.forms[0].sigungu.innerHTML = defaultSigungu[selectedSido]
        .map(sigungu => {
          return `<option value=${sigungu}>${sigungu}</option>`;
        })
        .join('');
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
        region: {
          lat: null,
          lng: null,
          address: null,
          sido: document.forms[0].sido.value,
          sigungu: document.forms[0].sigungu.value,
        },
        executionPeriod: [
          document.forms[0].startDate.value,
          document.forms[0].endDate.value,
        ],
        registerDeadline: document.forms[0].registerDeadline.value,
      };
      console.log(formData);

      try {
        const posts = await axios.post(
          'http://localhost:4000/posts',
          formData,
          { withCredentials: true },
        );
        console.log(posts);
      } catch (error) {
        console.log(error);
        alert('정상적으로 등록되지 않았습니다. 다시 시도해주세요.');
      }
    });
  };
}

const defaultSigungu = {
  강원도: [
    '강릉시',
    '동해시',
    '삼척시',
    '속초시',
    '원주시',
    '춘천시',
    '태백시',
    '고성군',
    '양구군',
    '양양군',
    '영월군',
    '인제군',
    '정선군',
    '철원군',
    '평창군',
    '홍천군',
    '화천군',
    '횡성군',
  ],
  경기도: [
    '고양시',
    '과천시',
    '광명시',
    '광주시',
    '구리시',
    '군포시',
    '김포시',
    '남양주시',
    '동두천시',
    '부천시',
    '성남시',
    '수원시',
    '시흥시',
    '안산시',
    '안성시',
    '안양시',
    '양주시',
    '오산시',
    '용인시',
    '의왕시',
    '의정부시',
    '이천시',
    '파주시',
    '평택시',
    '포천시',
    '하남시',
    '화성시',
    '가평군',
    '양평군',
    '여주군',
    '연천군',
  ],
  경상남도: [
    '거제시',
    '김해시',
    '마산시',
    '밀양시',
    '사천시',
    '양산시',
    '진주시',
    '진해시',
    '창원시',
    '통영시',
    '거창군',
    '고성군',
    '남해군',
    '산청군',
    '의령군',
    '창녕군',
    '하동군',
    '함안군',
    '함양군',
    '합천군',
  ],
  경상북도: [
    '경산시',
    '경주시',
    '구미시',
    '김천시',
    '문경시',
    '상주시',
    '안동시',
    '영주시',
    '영천시',
    '포항시',
    '고령군',
    '군위군',
    '봉화군',
    '성주군',
    '영덕군',
    '영양군',
    '예천군',
    '울릉군',
    '울진군',
    '의성군',
    '청도군',
    '청송군',
    '칠곡군',
  ],
  광주광역시: ['광산구', '남구', '동구', '북구', '서구'],
  대구광역시: [
    '남구',
    '달서구',
    '동구',
    '북구',
    '서구',
    '수성구',
    '중구',
    '달성군',
  ],
  대전광역시: ['대덕구', '동구', '서구', '유성구', '중구'],
  부산광역시: [
    '강서구',
    '금정구',
    '남구',
    '동구',
    '동래구',
    '부산진구',
    '북구',
    '사상구',
    '사하구',
    '서구',
    '수영구',
    '연제구',
    '영도구',
    '중구',
    '해운대구',
    '기장군',
  ],
  세종특별자치시: [],
  서울특별시: [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ],
  울산광역시: ['남구', '동구', '북구', '중구', '울주군'],
  인천광역시: [
    '계양구',
    '남구',
    '남동구',
    '동구',
    '부평구',
    '서구',
    '연수구',
    '중구',
    '강화군',
    '옹진군',
  ],
  전라남도: [
    '광양시',
    '나주시',
    '목포시',
    '순천시',
    '여수시',
    '강진군',
    '고흥군',
    '곡성군',
    '구례군',
    '담양군',
    '무안군',
    '보성군',
    '신안군',
    '영광군',
    '영암군',
    '완도군',
    '장성군',
    '장흥군',
    '진도군',
    '함평군',
    '해남군',
    '화순군',
  ],
  전라북도: [
    '군산시',
    '김제시',
    '남원시',
    '익산시',
    '전주시',
    '정읍시',
    '고창군',
    '무주군',
    '부안군',
    '순창군',
    '완주군',
    '임실군',
    '장수군',
    '진안군',
  ],
  제주특별자치도: ['서귀포시', '제주시', '남제주군', '북제주군'],
  충청북도: [
    '제천시',
    '청주시',
    '충주시',
    '괴산군',
    '단양군',
    '보은군',
    '영동군',
    '옥천군',
    '음성군',
    '증평군',
    '진천군',
    '청원군',
  ],
  충청남도: [
    '공주시',
    '논산시',
    '보령시',
    '서산시',
    '아산시',
    '천안시',
    '금산군',
    '당진군',
    '부여군',
    '서천군',
    '연기군',
    '예산군',
    '청양군',
    '태안군',
    '홍성군',
  ],
};

const defaultSido = [
  '강원도',
  '경기도',
  '경상남도',
  '경상북도',
  '광주광역시',
  '대구광역시',
  '대전광역시',
  '부산광역시',
  '세종특별자치시',
  '서울특별시',
  '울산광역시',
  '인천광역시',
  '전라남도',
  '전라북도',
  '제주특별자치도',
  '충청남도',
  '충청북도',
];

const defaultPosition = [
  ['frontend', '프론트엔드'],
  ['backend', '백엔드'],
];

const defaultStacks = [
  'cpp',
  'django',
  'flutter',
  'go',
  'java',
  'javascript',
  'kotlin',
  'nodejs',
  'python',
  'react',
  'spring',
  'swift',
  'typescript',
  'vue',
];
