/* eslint-disable implicit-arrow-linebreak */
import Component from '../../components/component';
import './mainPage.scss';
import bannerImg from '../../assets/images/banerImg.png';
import searchIcon from '../../assets/icons/search-icon.svg';
import { posts, defaultStacks } from '../../library/MainPage';
import Card from '../../components/Card/Card';
import SearchNotFound from '../../components/SearchNoResult/SearchNoResult';
import SkillStacksDropDown from '../../components/SkillStacksDropDown/SkillStacksDropDown';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('div', {
      className: 'main-page-wraper',
    });
    const $fragment = document.createDocumentFragment();
    $fragment.appendChild(this.$dom);

    this.state = posts;
    props.appendChild($fragment);
    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
    <section id="home">
      <div class="banerContainer">
        <div class="banerWord">
          <h1 class="homeTitle">팀은 프로젝트보다 만들기 어렵습니다.</h1>
          <h2 class="homeDescription">
          팀빌딩은 저희에게 맡기고 오늘 해야할 코딩에 집중하세요!<br>
          당신과 가까운 지역에서 진행하는 프로젝트 및 스터디를 추천해드립니다.<br>
          빠르게 모여 멋진 프로젝트를 만들어보세요!<br>
          </h2>
        </div>
        <img
          src="${bannerImg}"
          alt="baner image"
          class="banerImg"/> 
      </div>
    </section>
    <section id="serchBar">
    <div class="filterBtnLeftContainer">
      <div class="recomand">
        <svg xmlns="http://www.w3.org/2000/svg">
          <path d="m14.5.5.457.203A.5.5 0 0 0 14.5 0v.5ZM.5.5V0a.5.5 0 0 0-.5.5h.5Zm14 9v.5a.5.5 0 0 0 .457-.703L14.5 9.5Zm-2-4.5-.457-.203a.5.5 0 0 0 0 .406L12.5 5Zm2-5H.5v1h14V0ZM0 .5v9h1v-9H0ZM.5 10h14V9H.5v1Zm14.457-.703-2-4.5-.914.406 2 4.5.914-.406Zm-2-4.094 2-4.5-.914-.406-2 4.5.914.406ZM1 15V9.5H0V15h1Z" fill="#403845"/>
        </svg>
        <div class="recomandTitle">추천수</div>
      </div>
      <div class="recent">
        <svg xmlns="http://www.w3.org/2000/svg">
          <path d="m2.5 12.399.37-.336-.006-.007-.007-.007-.357.35Zm1 1.101v.5H4v-.5h-.5Zm3.5.982.018-.5-.053 1 .035-.5ZM7.5 7.5H7a.5.5 0 0 0 .146.354L7.5 7.5Zm6.5 0A6.5 6.5 0 0 1 7.5 14v1A7.5 7.5 0 0 0 15 7.5h-1ZM7.5 1A6.5 6.5 0 0 1 14 7.5h1A7.5 7.5 0 0 0 7.5 0v1Zm0-1A7.5 7.5 0 0 0 0 7.5h1A6.5 6.5 0 0 1 7.5 1V0ZM2.857 12.049A6.477 6.477 0 0 1 1 7.5H0c0 2.043.818 3.897 2.143 5.249l.714-.7Zm-.727.686 1 1.101.74-.672-1-1.101-.74.672ZM7.5 14a6.62 6.62 0 0 1-.465-.016l-.07.997c.177.013.355.019.535.019v-1Zm.018 0-.5-.017-.036 1 .5.017.036-1ZM7 3v4.5h1V3H7Zm.146 4.854 3 3 .708-.708-3-3-.708.708ZM0 14h3.5v-1H0v1Zm4-.5V10H3v3.5h1Z" fill="#403845"/>
        </svg>
        <div class="recentTitle">최신순</div>
      </div>
      <div class="populate">
        <svg xmlns="http://www.w3.org/2000/svg">
          <path d="m1 16 4.821-8.438 3.215 5.625L16 1m0 0v12.188M16 1H9.036" stroke="#403845"/>
        </svg>
        <div class="populateTitle">인기순</div>
      </div>
    </div>
    <div class="filterBtnRightContainer">
      <div class="wrapper">
        <div class="searchDiv">
          <input type="text" id="searchInput"/>
          <img
            src="${searchIcon}"
            alt="search image"
            class="searchIconImg"/> 
        </div>
      </div>
      <div class="skills">
        <svg xmlns="http://www.w3.org/2000/svg">
          <path d="M15 3.5H0m10 4H5m7 4H3" stroke="#403845"/>
        </svg>        
        <div class="skillsTitle">기술스택 필터링</div>
        <div class="drop-content"></div>
      </div>
      <div class="avail">
        <svg xmlns="http://www.w3.org/2000/svg">
          <path d="M11 1.5h2.5v12a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-12H4m1 7 2 2 3.5-4m-6-6h6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2Z" stroke="#403845"/>
        </svg>
        <div class="availTitle">모집중인 글만 보기</div>
      </div>
    </div>
    </section>
    <section class="mainPostCards">
      <div class="replaceDiv">
      </div>
    </section>
    </section>
    `;
    const dropContent = this.$dom.querySelector('.drop-content');
    const stacks = new SkillStacksDropDown({
      stackList: defaultStacks,
    });
    dropContent.appendChild(stacks.$dom);
    this.addEvent();
  };

  addEvent = () => {
    const createCard = () => {
      const $createFrag = document.createDocumentFragment();
      this.cardList = this.state.map(el => {
        const newCard = new Card(el);
        return newCard.$dom;
      });
      this.cardList.forEach(el => {
        $createFrag.appendChild(el);
      });
      const cardContainer = this.createDom('div', {
        classNams: 'cardContainer',
      });
      cardContainer.appendChild($createFrag);
      const replaceDiv = this.$dom.querySelector('.replaceDiv');
      this.replaceElement(replaceDiv, cardContainer);
    };

    const populate = this.$dom.querySelector('.populate');
    populate.addEventListener('click', () => {
      const statelist = posts.sort(
        (view1, view2) => -(parseFloat(view1.views) - parseFloat(view2.views)),
      );
      this.setState(statelist);
      createCard();
    });
    const recent = this.$dom.querySelector('.recent');
    recent.addEventListener('click', () => {
      const statelist = posts.sort((a, b) => {
        if (a.createdAt < b.createdAt) return 1;
        if (a.createdAt > b.createdAt) return -1;
        return 0;
      });
      this.setState(statelist);
      createCard();
    });
    const avail = this.$dom.querySelector('.avail');
    avail.addEventListener('click', () => {
      const statelist = posts.filter(
        post => post.recruitmentStatus === '모집중',
      );
      this.setState(statelist);
      createCard();
    });
    const searchInput = this.$dom.querySelector('#searchInput');
    const searchbtn = this.$dom.querySelector('.searchIconImg');
    const createNot = () => {
      const searchNotFound = new SearchNotFound();
      const searchNotFoundContainer = document.createElement('div');
      searchNotFoundContainer.className = 'searchNotFoundContainer';
      searchNotFoundContainer.appendChild(searchNotFound.$dom);
      const replaceDiv = this.$dom.querySelector('.replaceDiv');
      this.replaceElement(replaceDiv, searchNotFoundContainer);
    };
    const searchEventhandler = () => {
      if (!searchInput.value) {
        return;
      }
      const searchList = posts.filter(character => {
        return character.title.includes(searchInput.value);
      });
      if (searchList.length === 0) {
        this.setState([]);
        createNot();
        return;
      }
      this.setState(searchList);
      createCard();
    };

    searchbtn.addEventListener('click', () => {
      searchEventhandler();
    });
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        searchEventhandler();
      }
    });
    const skillIcon = this.$dom.getElementsByClassName('skill-icon')[0];

    skillIcon.addEventListener('click', e => {
      if (e.target && e.target.nodeName === 'IMG') {
        const statelist = posts.filter(el => el.stacks.includes(e.target.id));
        this.setState(statelist);
        createCard();
      }
    });
  };
}
