import Component from '../../components/Component';
import './mainPage.scss';
import { createDom } from '../../utils/dom';
import Card from '../../components/Card/Card';
import SearchNotFound from '../../components/SearchNoResult/SearchNoResult';
import MainBanner from '../../components/MainBanner/MainBanner';
import MainFilterBar from '../../components/MainFilterBar/MainFilterBar';
import axiosInstance from '../../utils/api';
import RouterContext from '../../router/RouterContext';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import { setPost, setTotal, setBasis, store } from '../../store/reducer';
import { observe } from '../../store/observe';
import { vDomToNode } from '../../utils/jsx-runtime';
import WebRequestController from '../../router/WebRequestController';

export default class MainPage extends Component {
  init() {
    this.projectOrStudy =
      RouterContext.state.pathname === '/' ? 'project' : 'study';
    this.state = { isLoading: true };
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

      new Card({
        container: cardWrapper,
        props: { post: el },
      });
      fragment.appendChild(cardWrapper);
    });
    cardContainer.appendChild(fragment);
  }

  bannerRender() {
    const banner = this.container.querySelector('.main__banner');
    new MainBanner({ container: banner });
  }

  searchNoResultRender() {
    const cardContainer = this.container.querySelector('.main-cards');
    new SearchNotFound({ container: cardContainer });
  }

  MainFilterBar() {
    const filterBar = this.container.querySelector('.main__filter');
    new MainFilterBar({ container: filterBar });
  }

  async mounted() {
    try {
      const {
        data: { data },
      } = await axiosInstance.get(
        `/posts?category=${this.projectOrStudy}&page=1&perPage=30`,
        {
          signal: WebRequestController.getController()?.signal,
        },
      );
      store.dispatch(setTotal(data));
      store.dispatch(setBasis(data));
      store.dispatch(setPost(store.getState().sortStandard(data)));
      this.setState({ ...this.state, isLoading: false });
    } catch (e) {
      console.log('????????? ?????????????????????.');
    }
  }

  markup() {
    return (
      <div class="main">
        <section class="main__banner"></section>
        <section class="main__filter"></section>
        <section class="main-cards"></section>
      </div>
    );
  }

  renderCallback() {
    this.MainFilterBar();

    this.bannerRender();
    if (this.state.isLoading) {
      this.skeletonCardRender();
    }
    if (store.getState().post.length !== 0 && !this.state.isLoading) {
      this.cardRender();
    }
    if (store.getState().post.length === 0 && !this.state.isLoading) {
      this.searchNoResultRender();
    }
  }

  render() {
    observe(() => {
      const vDOM = this.markup();

      // TODO: JSX???????????? ???????????? ??????
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
