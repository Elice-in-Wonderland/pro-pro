// import Component from '../../components/component';
import CustomComponent from '../../components/CustomComponent';
import './mainPage.scss';
import searchIcon from '../../assets/icons/search-icon.svg';
import { createDom, replaceElement } from '../../utils/dom';
import { defaultStacks } from '../../library/MainPage';
import Card from '../../components/Card/Card';
import SearchNotFound from '../../components/SearchNoResult/SearchNoResult';
import SkillStacksDropDown from '../../components/SkillStacksDropDown/SkillStacksDropDown';
import MainBanner from '../../components/MainBanner/MainBanner';
import axiosInstance from '../../utils/api';
import Routercontext from '../../router/RouterContext';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import {
  availFiltter,
  populateSort,
  recentSort,
  toggleButton,
  debounce,
} from '../../utils/filter';

export default class MainPage extends CustomComponent {
  init() {
    this.projectOrStudy = Routercontext.state.pathname;

    this.state = [];
    this.totalData = [];
    this.filterStacks = [];
    this.basisData = [];
    this.sortStandard = recentSort;
  }

  createCard = () => {
    const $createFrag = document.createDocumentFragment();
    this.cardList = this.state.map(el => {
      const newCard = new Card({ post: el, postList: this.state });
      return newCard.$dom;
    });
    this.cardList.forEach(el => {
      $createFrag.appendChild(el);
    });
    const cardContainer = createDom('div', {
      className: 'cardContainer',
    });
    cardContainer.appendChild($createFrag);
    const replaceDiv = this.container.querySelector('.replaceDiv');
    replaceElement(replaceDiv, cardContainer);
  };

  cardRender = () => {
    const Cards = createDom('section', { className: 'mainPostCards' });
    Cards.innerHTML = '<div class="replaceDiv"></div>';
    const oldContainer = this.container.querySelector('.mainPostCards');
    replaceElement(oldContainer, Cards);
    this.createCard();
  };

  async mounted() {
    if (this.projectOrStudy === '/study') {
      const {
        data: { data },
      } = await axiosInstance.get('/posts?category=study&page=1&perPage=30', {
        withCredentials: true,
      });
      this.totalData = data;
      this.basisData = data;
    }
    if (this.projectOrStudy === '/') {
      const {
        data: { data },
      } = await axiosInstance.get('/posts?category=project&page=1&perPage=30', {
        withCredentials: true,
      });
      this.totalData = data;
      this.basisData = data;
    }
    this.setState(recentSort(this.totalData));
  }

  setState = nextState => {
    this.state = nextState;
    this.cardRender();
  };

  markup() {
    return `
    <div class="main-page-wrapper">
      <section class="skills-bar">
        <div class="drop-content"></div>
      </section>
      <section id="searchBar">
        <button type="button" class="recent activated">
          <div class="recentTitle btn-title">최신순</div>
        </button>
        <button type="button" class="populate">
          <div class="populateTitle btn-title">인기순</div>
        </button>
        <div class="wrapper">
          <div class="searchDiv">
            <input aria-label="검색" type="text" id="searchInput"/>
            <img
              src="${searchIcon}"
              alt="search image"
              class="searchIconImg"/> 
          </div>
        </div>
        <button type="button" class="entire activated">
        <div class="entireTitle btn-title">전체 글</div>
      </button>
        <button type="button" class="avail">
        <div class="availTitle btn-title">모집중인 글</div>
      </button>

      </section>
      <section class='mainPostCards'>
        <div class="replaceDiv"></div>
      </section>
    </div>
    `;
  }

  renderCallback() {
    const createSkeletonCard = () => {
      const $createFrag = new DocumentFragment();
      Array.from({ length: 30 }).forEach(() => {
        const newCard = new SkeletonCard();
        $createFrag.appendChild(newCard.$dom);
      });

      const cardContainer = createDom('div', {
        className: 'cardContainer',
      });
      cardContainer.appendChild($createFrag);
      const replaceDiv = this.container.querySelector('.replaceDiv');
      replaceElement(replaceDiv, cardContainer);
    };

    const skillStackRender = () => {
      const dropContent = this.container.querySelector('.drop-content');
      const stacks = new SkillStacksDropDown({
        stackList: defaultStacks,
      });
      dropContent.appendChild(stacks.$dom);
    };
    const banner = createDom('section', {
      className: 'home',
    });
    new MainBanner({ container: banner });

    this.container.prepend(banner);
    createSkeletonCard();
    skillStackRender();
  }

  toggleBasisData = buttonType => {
    if (buttonType === 'avail') {
      this.basisData = availFiltter(this.totalData);
      this.setState(this.sortStandard(availFiltter(this.state)));
      return;
    }
    this.basisData = this.totalData;
    this.setState(this.sortStandard(this.totalData));
  };

  toggleBasisSort = sortType => {
    if (sortType === 'recent') {
      this.sortStandard = recentSort;
      return;
    }
    this.sortStandard = populateSort;
  };

  setEvent() {
    const skillIcon = this.container.getElementsByClassName('skill-icon')[0];
    const avail = this.container.querySelector('.avail');
    const entirePost = this.container.querySelector('.entire');
    const recent = this.container.querySelector('.recent');
    const populate = this.container.querySelector('.populate');
    const searchInput = this.container.querySelector('#searchInput');
    const searchbtn = this.container.querySelector('.searchIconImg');

    const skillStackFilter = () => {
      if (this.filterStacks) {
        const statelist = this.basisData.filter(el =>
          this.filterStacks.every(post => el.stacks.includes(post)),
        );
        this.setState(this.sortStandard(statelist));
      }
    };

    const removeSkillStackFilter = () => {
      this.filterStacks = [];
      skillIcon.childNodes.forEach(imgNode =>
        imgNode.classList.remove('activateBtn'),
      );
    };

    skillIcon.addEventListener('click', e => {
      if (e.target?.nodeName !== 'IMG') return;
      if (this.filterStacks.includes(e.target.id)) {
        this.filterStacks.splice(this.filterStacks.indexOf(e.target.id), 1);
        e.target.classList.remove('activateBtn');
        skillStackFilter();
        return;
      }
      this.filterStacks.push(e.target.id);
      e.target.classList.add('activateBtn');
      skillStackFilter();
    });

    populate.addEventListener('click', () => {
      toggleButton(populate, recent);
      this.toggleBasisSort('populate');
      this.setState(populateSort(this.state));
    });

    recent.addEventListener('click', () => {
      toggleButton(recent, populate);
      this.toggleBasisSort('recent');
      this.setState(recentSort(this.state));
    });

    entirePost.addEventListener('click', () => {
      toggleButton(entirePost, avail);
      this.toggleBasisData('entire');
      skillStackFilter();
    });

    avail.addEventListener('click', () => {
      toggleButton(avail, entirePost);
      this.toggleBasisData('avail');
      skillStackFilter();
    });

    const createNot = () => {
      const searchNotFound = new SearchNotFound();
      const searchNotFoundContainer = document.createElement('div');
      searchNotFoundContainer.className = 'searchNotFoundContainer';
      searchNotFoundContainer.appendChild(searchNotFound.$dom);
      const replaceDiv = this.$dom.querySelector('.cardContainer');
      replaceElement(replaceDiv, searchNotFoundContainer);
    };

    const searchEventhandler = () => {
      removeSkillStackFilter();
      if (!searchInput.value) {
        return;
      }
      const searchList = this.basisData.filter(character => {
        return character.title.includes(searchInput.value);
      });
      if (searchList.length === 0) {
        this.setState([]);
        searchInput.value = null;
        createNot();
        return;
      }
      this.setState(searchList);
      searchInput.value = null;
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
  }
}
