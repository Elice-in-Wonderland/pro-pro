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
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';

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
    this.filterStacks = [];
    this.appendRoot(props, $fragment);
    this.render();
    this.createSkeletonCard();
    this.getInitState();
    this.addEvent();
  }

  availFiltter = datalist => {
    const today = new Date();
    const statelist = datalist.filter(
      post => post.registerDeadline >= today.toISOString(),
    );
    return statelist;
  };

  getInitState = async () => {
    if (this.projectOrStudy === '/study') {
      const {
        data: { data },
      } = await axiosInstance.get('/posts?category=study&page=1&perPage=30', {
        withCredentials: true,
      });
      this.data = data;
    }
    if (this.projectOrStudy === '/') {
      const {
        data: { data },
      } = await axiosInstance.get('/posts?category=project&page=1&perPage=30', {
        withCredentials: true,
      });
      this.data = data;
    }
    this.setState(this.data);
    this.availToggleData = this.availFiltter(this.data);
  };

  setState = nextState => {
    this.state = nextState;
    this.cardRender();
  };

  render = () => {
    this.$dom.innerHTML = `
    <section class="skills-bar">
      <div class="drop-content"></div>
    </section>
    <section id="searchBar">
      <div class="avail btns">
        <div class="availTitle btn-title">모집중인 글</div>
      </div>
      <div class="entire btns">
        <div class="entireTitle btn-title">전체 글</div>
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
    <section class='mainPostCards'>
      <div class="replaceDiv"></div>
    </section>
    `;
    this.$dom.prepend(this.$banner.$dom);
    this.renderSkillStack();
  };

  renderSkillStack = () => {
    const dropContent = this.$dom.querySelector('.drop-content');
    const stacks = new SkillStacksDropDown({
      stackList: defaultStacks,
    });
    dropContent.appendChild(stacks.$dom);
  };

  cardRender = () => {
    const Cards = this.createDom('section', { className: 'mainPostCards' });
    Cards.innerHTML = '<div class="replaceDiv"></div>';
    const oldContainer = this.$dom.querySelector('.mainPostCards');
    this.replaceElement(oldContainer, Cards);
    this.createCard();
  };

  createSkeletonCard = () => {
    const $createFrag = new DocumentFragment();
    Array.from({ length: 6 }).forEach(li => {
      const newCard = new SkeletonCard();
      $createFrag.appendChild(newCard.$dom);
    });

    const cardContainer = this.createDom('div', {
      className: 'cardContainer',
    });
    cardContainer.appendChild($createFrag);
    const replaceDiv = this.$dom.querySelector('.replaceDiv');
    this.replaceElement(replaceDiv, cardContainer);
  };

  createCard = () => {
    const $createFrag = document.createDocumentFragment();
    this.cardList = this.state.map(el => {
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

  addEvent = () => {
    const skillIcon = this.$dom.getElementsByClassName('skill-icon')[0];
    const avail = this.$dom.querySelector('.avail');
    const entirePost = this.$dom.querySelector('.entire');
    const recent = this.$dom.querySelector('.recent');
    const populate = this.$dom.querySelector('.populate');
    const searchInput = this.$dom.querySelector('#searchInput');
    const searchbtn = this.$dom.querySelector('.searchIconImg');

    function debounce(eventHandlerFunc, leading = true) {
      let inDebounce;
      return (...args) => {
        const context = this;
        const nowCall = leading && !inDebounce;
        const later = () => {
          inDebounce = null;
          if (!leading) eventHandlerFunc.apply(context, args);
        };

        clearTimeout(inDebounce);
        inDebounce = setTimeout(later, 500);
        if (nowCall) eventHandlerFunc.apply(context, args);
      };
    }

    const skillStackFiltter = () => {
      if (this.filterStacks) {
        const statelist = this.data.filter(el =>
          this.filterStacks.every(post => el.stacks.includes(post)),
        );
        this.setState(statelist);
      }
    };

    skillIcon.addEventListener('click', e => {
      if (e.target && e.target.nodeName === 'IMG') {
        if (this.filterStacks.includes(e.target.id)) {
          this.filterStacks.splice(this.filterStacks.indexOf(e.target.id), 1);
          e.target.classList.remove('activateBtn');
        } else {
          this.filterStacks.push(e.target.id);
          e.target.classList.add('activateBtn');
        }
        skillStackFiltter();
      }
    });

    const populatEventHandler = datalist => {
      const statelist = datalist.sort(
        (view1, view2) => -(parseFloat(view1.views) - parseFloat(view2.views)),
      );
      return statelist;
    };

    populate.addEventListener('click', () => {
      if (this.filterStacks.length === 0) {
        this.setState(populatEventHandler(this.data));
      } else {
        this.setState(populatEventHandler(this.state));
      }
    });

    const recentEventHandler = datalist => {
      const statelist = datalist.sort((a, b) => {
        if (a.createdAt < b.createdAt) return 1;
        if (a.createdAt > b.createdAt) return -1;
        return 0;
      });
      return statelist;
    };

    recent.addEventListener('click', () => {
      if (this.filterStacks.length === 0) {
        this.setState(recentEventHandler(this.data));
      } else {
        this.setState(recentEventHandler(this.state));
      }
    });

    entirePost.addEventListener('click', () => {
      skillStackFiltter();
    });

    avail.addEventListener('click', () => {
      if (this.filterStacks.length !== 0) {
        this.setState(this.availFiltter(this.state));
      } else {
        this.setState(this.availFiltter(this.data));
      }
    });

    const createNot = () => {
      const searchNotFound = new SearchNotFound();
      const searchNotFoundContainer = document.createElement('div');
      searchNotFoundContainer.className = 'searchNotFoundContainer';
      searchNotFoundContainer.appendChild(searchNotFound.$dom);
      const replaceDiv = this.$dom.querySelector('.cardContainer');
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
    };

    searchbtn.addEventListener(
      'click',
      debounce(() => {
        searchEventhandler();
      }),
    );

    searchInput.addEventListener(
      'keydown',
      debounce(e => {
        if (e.key === 'Enter') {
          searchEventhandler();
        }
      }),
    );
  };
}
