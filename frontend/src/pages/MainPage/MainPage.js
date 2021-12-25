/* eslint-disable implicit-arrow-linebreak */
import Component from '../../components/component';
import './mainPage.scss';
import searchIcon from '../../assets/icons/search-icon.svg';
import { defaultStacks } from '../../library/MainPage';
import Card from '../../components/Card/Card';
import SearchNotFound from '../../components/SearchNoResult/SearchNoResult';
import SkillStacksDropDown from '../../components/SkillStacksDropDown/SkillStacksDropDown';
import MainBanner from '../../components/MainBanner/MainBanner';
import axiosInstance from '../../utils/api';
import Routercontext from '../../router/RouterContext';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('div', {
      className: 'main-page-wraper',
    });
    this.projectOrStudy = Routercontext.state.pathname;

    this.$banner = new MainBanner();
    const $fragment = document.createDocumentFragment();
    $fragment.appendChild(this.$dom);
    this.state = [];
    this.data = [];
    this.appendRoot(props, $fragment);
    this.render();
    this.getInitState();
    this.addEvent();
  }

  getInitState = async () => {
    if (this.projectOrStudy === '/study') {
      const {
        data: { data },
      } = await axiosInstance.get('/posts?category=study&page=1&perPage=30', {
        withCredentials: true,
      });
      this.data = data;
      console.log(this.data);
    }
    console.log(this.projectOrStudy);
    if (this.projectOrStudy === '/') {
      const {
        data: { data },
      } = await axiosInstance.get('/posts?category=project&page=1&perPage=30', {
        withCredentials: true,
      });
      this.data = data;
    }
    this.setState(this.data);
    this.createCard();
  };

  createCard = () => {
    console.log(this.state);
    const $createFrag = document.createDocumentFragment();
    this.cardList = this.state.map(el => {
      // TODO: 바꿔야 할 부분
      const newCard = new Card({ post: el, postList: this.state });
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
    <section class="skills-bar">
    <div class="drop-content"></div>
  </section>
    <section id="serchBar">
      <div class="avail btns">
        <div class="availTitle btn-title">모집중인 글</div>
      </div>
      <div class="recent btns">
        <div class="recentTitle btn-title">최신순</div>
      </div>
      <div class="populate btns">
        <div class="populateTitle btn-title">인기순</div>
      </div>
      <div class="wrapper">
        <div class="searchDiv">
          <input type="text" id="searchInput"/>
          <img
            src="${searchIcon}"
            alt="search image"
            class="searchIconImg"/> 
        </div>
      </div>
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
      const statelist = this.data.sort(
        (view1, view2) => -(parseFloat(view1.views) - parseFloat(view2.views)),
      );
      this.setState(statelist);
      this.createCard();
    });
    const recent = this.$dom.querySelector('.recent');
    recent.addEventListener('click', () => {
      const statelist = this.data.sort((a, b) => {
        if (a.createdAt < b.createdAt) return 1;
        if (a.createdAt > b.createdAt) return -1;
        return 0;
      });
      this.setState(statelist);
      this.createCard();
    });
    const avail = this.$dom.querySelector('.avail');
    avail.addEventListener('click', () => {
      const today = new Date();
      const statelist = this.state.filter(
        post => post.registerDeadline >= today.toISOString(),
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
      const searchList = this.data.filter(character => {
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
        const statelist = this.data.filter(el =>
          el.stacks.includes(e.target.id),
        );
        this.setState(statelist);
        this.createCard();
      }
    });
  };
}
