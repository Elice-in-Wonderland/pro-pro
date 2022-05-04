// import Component from '../../components/component';
import CustomComponent from '../../components/CustomComponent';
import './mainPage.scss';
import searchIcon from '../../assets/icons/search-icon.svg';
import { createDom } from '../../utils/dom';
import MainCard from '../../components/MainCard/MainCard';
import SearchNotFound from '../../components/SearchNoResult/SearchNoResult';
import SkillStacksFilter from '../../components/SkillStacksFilter/SkillStacksFilter';
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

  skeletonCardRender() {
    const $createFrag = new DocumentFragment();

    Array.from({ length: 30 }).forEach(() => {
      const cardSkelton = createDom('div', {
        className: 'card-skeleton',
      });

      new SkeletonCard({
        container: cardSkelton,
        props: { fragment: $createFrag },
      });
    });
    const cardContainer = this.container.querySelector('.card-container');
    cardContainer.appendChild($createFrag);
  }

  cardRender = () => {
    const cardContainer = this.container.querySelector('.card-container');
    cardContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    this.state.forEach(el => {
      const cardWrapper = createDom('div', {
        className: 'card-wrapper',
      });

      new MainCard({
        container: cardWrapper,
        props: { post: el, postList: this.state },
      });
      fragment.appendChild(cardWrapper);
    });
    cardContainer.appendChild(fragment);
  };

  skillStackRender() {
    const skillsBar = this.container.querySelector('.skills-bar');
    new SkillStacksFilter({ container: skillsBar });
  }

  bannerRender() {
    const banner = this.container.querySelector('.home-banner');
    new MainBanner({ container: banner });
  }

  searchNoResultRender = () => {
    const cardContainer = this.container.querySelector('.card-container');
    new SearchNotFound({ container: cardContainer });
  };

  setState = nextState => {
    this.state = nextState;
    this.cardRender();
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

  markup() {
    return `
    <div class="main-page-wrapper">
    <section class="home-banner">

    </section>
      <section class="skills-bar">

      </section>
      <section id="filter-bar">
        <button type="button" class="recent activated">
          <div class="recentTitle btn-title">최신순</div>
        </button>
        <button type="button" class="populate">
          <div class="populateTitle btn-title">인기순</div>
        </button>
        <div class="wrapper">
          <div class="search-bar">
            <input aria-label="검색" type="text" id="search-input"/>
            <img
              src="${searchIcon}"
              alt="search image"
              class="search-icon"/> 
          </div>
        </div>
        <button type="button" class="entire activated">
        <div class="entire-title btn-title">전체 글</div>
      </button>
        <button type="button" class="avail">
        <div class="avail-title btn-title">모집중인 글</div>
      </button>

      </section>
      <section class='card-container'>
      </section>
    </div>
    `;
  }

  renderCallback() {
    this.bannerRender();
    this.skeletonCardRender();
    this.skillStackRender();
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
    const skillIcon = this.container.querySelector('.skill-icon');
    const avail = this.container.querySelector('.avail');
    const entirePost = this.container.querySelector('.entire');
    const recent = this.container.querySelector('.recent');
    const populate = this.container.querySelector('.populate');
    const searchInput = this.container.querySelector('#search-input');
    const searchbtn = this.container.querySelector('.search-icon');

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
        this.searchNoResultRender();
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
