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
import RouterContext from '../../router/RouterContext';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import {
  availFilter,
  populateSort,
  recentSort,
  toggleButton,
  debounce,
} from '../../utils/filter';

export default class MainPage extends CustomComponent {
  init() {
    this.projectOrStudy = RouterContext.state.pathname;

    this.state = [];
    this.totalData = [];
    this.filterStacks = [];
    this.basisData = [];
    this.sortStandard = recentSort;
  }

  skeletonCardRender() {
    const cardContainer = this.container.querySelector('.main-cards');
    const fragment = new DocumentFragment();

    Array.from({ length: 30 }).forEach(() => {
      const cardSkelton = createDom('div', {
        className: 'card-skeleton',
      });

      new SkeletonCard({
        container: cardSkelton,
      });
      fragment.appendChild(cardSkelton);
    });

    cardContainer.appendChild(fragment);
  }

  cardRender = () => {
    const cardContainer = this.container.querySelector('.main-cards');
    cardContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    this.state.forEach(el => {
      const cardWrapper = createDom('div', {
        className: 'card-wrapper',
      });

      new MainCard({
        container: cardWrapper,
        props: { post: el },
      });
      fragment.appendChild(cardWrapper);
    });
    cardContainer.appendChild(fragment);
  };

  skillStackRender() {
    const skillsBar = this.container.querySelector('.main__skills');
    new SkillStacksFilter({ container: skillsBar });
  }

  bannerRender() {
    const banner = this.container.querySelector('.main__banner');
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
    return (
      <div class="main">
        <section class="main__banner"></section>
        <section class="main__skills"></section>
        <section class="main__filter">
          <button type="button" class="main__filter-recent activated">
            최신순
          </button>
          <button type="button" class="main__filter-populate">
            인기순
          </button>
          <div class="main__search">
            <input aria-label="검색" type="text" class="main__search-input" />
            <img src={searchIcon} alt="search image" class="main__search-btn" />
          </div>
          <button type="button" class="main__filter-entire activated">
            전체 글
          </button>
          <button type="button" class="main__filter-avail">
            모집중인 글
          </button>
        </section>
        <section class="main-cards"></section>
      </div>
    );
  }

  renderCallback() {
    this.bannerRender();
    this.skeletonCardRender();
    this.skillStackRender();
  }

  toggleBasisData = buttonType => {
    if (buttonType === 'avail') {
      this.basisData = availFilter(this.totalData);
      this.setState(this.sortStandard(availFilter(this.state)));
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
    const skillIcon = this.container.querySelector('.skill__icon');
    const avail = this.container.querySelector('.main__filter-avail');
    const entirePost = this.container.querySelector('.main__filter-entire');
    const recent = this.container.querySelector('.main__filter-recent');
    const populate = this.container.querySelector('.main__filter-populate');
    const searchInput = this.container.querySelector('.main__search-input');
    const searchBtn = this.container.querySelector('.main__search-btn');

    const skillStackFilter = () => {
      if (this.filterStacks) {
        const stateList = this.basisData.filter(el =>
          this.filterStacks.every(post => el.stacks.includes(post)),
        );
        this.setState(this.sortStandard(stateList));
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

    const searchEventHandler = () => {
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

    searchBtn.addEventListener(
      'click',
      debounce(() => {
        searchEventHandler();
      }),
    );

    searchInput.addEventListener(
      'keydown',
      debounce(e => {
        if (e.key === 'Enter') {
          searchEventHandler();
        }
      }),
    );
  }
}
