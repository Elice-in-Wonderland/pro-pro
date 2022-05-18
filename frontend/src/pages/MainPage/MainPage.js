// import Component from '../../components/component';
import CustomComponent from '../../components/CustomComponent';
import './mainPage.scss';
import { createDom } from '../../utils/dom';
import MainCard from '../../components/MainCard/MainCard';
import SearchNotFound from '../../components/SearchNoResult/SearchNoResult';
import SkillStacksFilter from '../../components/SkillStacksFilter/SkillStacksFilter';
import MainBanner from '../../components/MainBanner/MainBanner';
import MainFilterBar from '../../components/MainFilterBar/MainFilterBar';
import axiosInstance from '../../utils/api';
import RouterContext from '../../router/RouterContext';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import { setPost, setTotal, setBasis, store } from './store';
import { observe } from '../../store/observe';
import { vDomToNode } from '../../utils/jsx-runtime';

export default class MainPage extends CustomComponent {
  init() {
    this.projectOrStudy = RouterContext.state.pathname;
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

  cardRender() {
    const cardContainer = this.container.querySelector('.main-cards');
    cardContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    store.getState().post.forEach(el => {
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
  }

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

  MainFilterBar() {
    const filterBar = this.container.querySelector('.main__filter-bar');
    new MainFilterBar({ container: filterBar });
  }

  async mounted() {
    if (this.projectOrStudy === '/study') {
      const {
        data: { data },
      } = await axiosInstance.get('/posts?category=study&page=1&perPage=30', {
        withCredentials: true,
      });
      this.totalData = data;
      this.basisData = data;
      store.dispatch(setTotal(data));
      store.dispatch(setBasis(data));
      store.dispatch(setPost(store.getState().sortStandard(data)));
    }
    if (this.projectOrStudy === '/') {
      const {
        data: { data },
      } = await axiosInstance.get('/posts?category=project&page=1&perPage=30', {
        withCredentials: true,
      });
      this.totalData = data;
      this.basisData = data;

      store.dispatch(setTotal(data));
      store.dispatch(setBasis(data));
      store.dispatch(setPost(store.getState().sortStandard(data)));
    }
  }

  markup() {
    return (
      <div class="main">
        <section class="main__banner"></section>
        <section class="main__skills"></section>
        <section class="main__filter-bar"></section>
        <section class="main-cards"></section>
      </div>
    );
  }

  renderCallback() {
    this.bannerRender();
    this.skeletonCardRender();
    this.MainFilterBar();

    if (store.getState().post.length !== 0) this.cardRender();
  }

  render() {
    observe(() => {
      const vDOM = this.markup();

      // TODO: JSX관련해서 수정되면 제거
      if (typeof vDOM === 'string') this.container.innerHTML = vDOM;
      else {
        const fragment = new DocumentFragment();
        vDomToNode(vDOM, fragment);
        this.container?.replaceChildren(fragment);
      }

      this.renderCallback();
      this.setEvent();
    });
  }
}
