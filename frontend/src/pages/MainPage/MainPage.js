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
import {
  availFiltter,
  populateSort,
  recentSort,
  toggleButton,
  debounce,
} from '../../utils/filter';

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('div', {
      className: 'main-page-wrapper',
    });
    this.projectOrStudy = Routercontext.state.pathname;

    this.$banner = new MainBanner();
    const $fragment = document.createDocumentFragment();
    $fragment.appendChild(this.$dom);
    this.state = [];
    this.totalData = [];
    this.filterStacks = [];
    this.basisData = [];
    this.sortStandard = recentSort;
    this.appendRoot(props, $fragment);
    this.render();
    this.createSkeletonCard();
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

  addEvent = () => {
    const skillIcon = this.$dom.getElementsByClassName('skill-icon')[0];
    const avail = this.$dom.querySelector('.avail');
    const entirePost = this.$dom.querySelector('.entire');
    const recent = this.$dom.querySelector('.recent');
    const populate = this.$dom.querySelector('.populate');
    const searchInput = this.$dom.querySelector('#searchInput');
    const searchbtn = this.$dom.querySelector('.searchIconImg');

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
      this.replaceElement(replaceDiv, searchNotFoundContainer);
    };

    const searchEventhandler = () => {
      removeSkillStackFilter();
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
