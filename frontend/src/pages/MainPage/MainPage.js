/* eslint-disable implicit-arrow-linebreak */
import Component from '../../components/component';
import './mainPage.scss';
import recomandIcon from '../../assets/icons/recomand-icon.svg';
import recentIcon from '../../assets/icons/recent-icon.svg';
import populateIcon from '../../assets/icons/populate-icon.svg';
import searchIcon from '../../assets/icons/search-icon.svg';
import skillstackIcon from '../../assets/icons/skillstack-icon.svg';
import availIcon from '../../assets/icons/avail-icon.svg';
import { posts, defaultStacks } from '../../library/MainPage';
import Card from '../../components/Card/Card';
import SearchNotFound from '../../components/SearchNoResult/SearchNoResult';
import SkillStacksDropDown from '../../components/SkillStacksDropDown/SkillStacksDropDown';
import MainBanner from '../../components/MainBanner/MainBanner';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('div', {
      className: 'main-page-wraper',
    });
    this.$banner = new MainBanner();
    const $fragment = document.createDocumentFragment();
    $fragment.appendChild(this.$dom);
    this.state = posts;
    this.appendRoot(props, $fragment);
    this.render();
    this.createCard();
    this.addEvent();
  }

  createCard = () => {
    const $createFrag = document.createDocumentFragment();
    this.cardList = this.state.map(el => {
      // TODO: 바꿔야 할 부분
      const newCard = new Card({ post: el, postList: posts });
      return newCard.$dom;
    });
    this.cardList.forEach(el => {
      $createFrag.appendChild(el);
    });
    const cardContainer = this.createDom('div', {
      className: 'cardContainer',
    });
    cardContainer.appendChild($createFrag);
    const replaceDiv = this.$dom.querySelector('.replaceDiv');
    this.replaceElement(replaceDiv, cardContainer);
  };

  render = () => {
    this.$dom.innerHTML = `
    <section id="serchBar">
    <div class="filterBtnLeftContainer">
      <div class="recomand">
      <img
      src="${recomandIcon}"
      alt="search image"
      class="searchIconImg"/> 
        <div class="recomandTitle">추천수</div>
      </div>
      <div class="recent">
      <img
      src="${recentIcon}"
      alt="search image"
      class="searchIconImg"/> 
        <div class="recentTitle">최신순</div>
      </div>
      <div class="populate">
      <img
      src="${populateIcon}"
      alt="search image"
      class="searchIconImg"/> 
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
      <img
      src="${skillstackIcon}"
      alt="search image"
      class="searchIconImg"/>     
        <div class="skillsTitle">기술스택 필터링</div>
      </div>
      <div class="avail">
      <img
      src="${availIcon}"
      alt="search image"
      class="searchIconImg"/> 
        <div class="availTitle">모집중인 글만 보기</div>
      </div>
    </div>
    </section>
    <section class="skills-bar">
      <div class="drop-content"></div>
    </section>
    <section class="mainPostCards">
      <div class="replaceDiv">
      </div>
    </section>
    </section>
    `;
    this.$dom.prepend(this.$banner.$dom);
    const dropContent = this.$dom.querySelector('.drop-content');
    const stacks = new SkillStacksDropDown({
      stackList: defaultStacks,
    });
    dropContent.appendChild(stacks.$dom);
    this.addEvent();
  };

  addEvent = () => {
    const populate = this.$dom.querySelector('.populate');
    populate.addEventListener('click', () => {
      const statelist = posts.sort(
        (view1, view2) => -(parseFloat(view1.views) - parseFloat(view2.views)),
      );
      this.setState(statelist);
      this.createCard();
    });
    const recent = this.$dom.querySelector('.recent');
    recent.addEventListener('click', () => {
      const statelist = posts.sort((a, b) => {
        if (a.createdAt < b.createdAt) return 1;
        if (a.createdAt > b.createdAt) return -1;
        return 0;
      });
      this.setState(statelist);
      this.createCard();
    });
    const avail = this.$dom.querySelector('.avail');
    avail.addEventListener('click', () => {
      const statelist = posts.filter(
        post => post.recruitmentStatus === '모집중',
      );
      this.setState(statelist);
      this.createCard();
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
      this.createCard();
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
        this.createCard();
      }
    });
  };
}
