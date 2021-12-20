import Component from '../../components/component';
import './profilePage.scss';

// TODO: 리팩토링 및 개선점 찾아보기
export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    // 전송 시 보내야할 데이터
    this.data = {
      nickname: '',
      region: {
        sido: '',
        sigungu: '',
      },
      position: '',
      stacks: [],
      imageURL: '',
    };

    // 해당 컴포넌트에 최상단 노드
    this.$dom = this.createDom('div', {
      className: 'profile-page-wrapper',
    });

    props.$app.appendChild(this.$dom);

    this.render();
    // render 후 데이터 불러오기
    this.getInitState();
    this.addEvent();
  }

  getInitState = () => {
    // TODO: axios 호출해서 프로필 정보 가져오기
    const profile = this.getProfile();

    this.setData(profile);
    this.render();
  };

  getProfile = () => {
    const profile = {
      nickname: '홍길동',
      region: {
        sido: '서울특별시',
        sigungu: '서대문구',
      },
      position: 'frontend',
      stacks: ['Javascript', 'React', 'C#'],
      imageURL: '',
    };
    return profile;
  };

  setData = nextData => {
    this.data = { ...this.data, ...nextData };
    console.log('데이터 관리:', this.data);
  };

  render = () => {
    this.$dom.innerHTML = `
        <div class="container">
            <div class="userImg">
              <img src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="" />
            </div>
            <div class="form">
              <div class="field">
                <label for="nickname"><b>닉네임</b></label>
                <input type="text" id="nickname" class="nickname-input" value=${this.data.nickname} placeholder="닉네임을 입력하세요."/>
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
                  <button type="button" class="unsubscribeBtn">회원 탈퇴</button>
                  <button type="submit" class="updateBtn">수정 완료</button>
              </div>
            </div>
        </div>
    `;

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
      'Javascript',
      'C',
      'Kotiln',
      'Java',
      'React',
      'C++',
      'Django',
      'Spring',
      'Vue',
      'C#',
      'Go',
      'Flutter',
      'Node',
      'Typescript',
      'Swift',
    ];

    const $sidoSelect = this.$dom.querySelector('.sido-select');
    const $positionSelect = this.$dom.querySelector('.position-select');
    const $stackSelect = this.$dom.querySelector('.stack-select');

    defaultSido.forEach(sido => {
      const opt = document.createElement('option');
      opt.value = sido;
      opt.innerHTML = sido;
      if (sido === this.data.region.sido) opt.selected = true;

      $sidoSelect.appendChild(opt);
    });
    this.sigunguChange(this.data.region.sido);

    defaultPosition.forEach(position => {
      const opt = document.createElement('option');
      [opt.value, opt.innerHTML] = position;
      if (this.data.position === position[0]) opt.selected = true;
      $positionSelect.appendChild(opt);
    });

    defaultStacks.forEach(stack => {
      const div = document.createElement('div');
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.classList.add('check-with-label');
      input.value = stack;
      input.id = stack;
      label.setAttribute('for', stack);
      label.classList.add('label-for-check');
      label.innerHTML = stack;

      if (this.data.stacks.indexOf(stack) !== -1) input.checked = true;
      div.appendChild(input);
      div.appendChild(label);
      $stackSelect.appendChild(div);
    });
  };

  sigunguChange(sido) {
    const $sigungu = document.querySelector('#sigungu');
    const sigungu = {
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

    const selectedSido = sigungu[sido];

    // sigungu reset
    $sigungu.options.length = 1;

    // eslint-disable-next-line guard-for-in
    for (const property in selectedSido) {
      const opt = document.createElement('option');
      opt.value = selectedSido[property];
      opt.innerHTML = selectedSido[property];
      if (selectedSido[property] === this.data.region.sigungu) {
        opt.selected = true;
      }

      $sigungu.appendChild(opt);
    }
  }

  addEvent = () => {
    const $nicknameInput = this.$dom.querySelector('.nickname-input');
    const $sidoSelect = this.$dom.querySelector('.sido-select');
    const $sigunguSelect = this.$dom.querySelector('.sigungu-select');
    const $positionSelect = this.$dom.querySelector('.position-select');
    const $stackSelect = this.$dom.querySelector('.stack-select');
    const stacks = document.querySelectorAll(
      'input[type=checkbox][name=stacks]',
    );

    $nicknameInput.addEventListener('input', () => {
      this.setData({ nickname: $nicknameInput.value });
    });

    $sidoSelect.addEventListener('change', e => {
      this.sigunguChange(e.target.value);
      this.setData({
        region: {
          sido: $sidoSelect.value,
          sigungu: '',
        },
      });
    });

    $sigunguSelect.addEventListener('change', () => {
      this.setData({
        region: {
          sido: $sidoSelect.value,
          sigungu: $sigunguSelect.value,
        },
      });
    });

    $positionSelect.addEventListener('change', () => {
      this.setData({ position: $positionSelect.value });
    });

    $stackSelect.addEventListener('change', () => {
      const checkedList = [...stacks].reduce((acc, stack) => {
        if (stack.checked) acc.push(stack.value);
        return acc;
      }, []);

      this.setData({
        stacks: checkedList,
      });
    });
  };
}
