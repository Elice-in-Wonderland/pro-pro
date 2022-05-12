import axiosInstance from '../../utils/api';
import Card from '../../components/Card/Card';
import './bookmarkPage.scss';
import CustomComponent from '../../components/CustomComponent';
import { createDom } from '../../utils/dom';
import Toast from '../../components/Toast/Toast';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';

export default class BookmarkPage extends CustomComponent {
  init() {
    this.state = [];
  }

  async mounted() {
    try {
      await axiosInstance
        .get('/users/mark?category=project&page=1&perPage=10', {
          withCredentials: true,
        })
        .then(res => {
          return res.data.data;
        })
        .then(cards => {
          this.setState(cards);
          this.cardRender();
        });
    } catch (e) {
      new Toast({ content: '북마크 정보 불러오기 실패', type: 'fail' });
    }
  }

  markup() {
    return (
      <div class="bookmark">
        <div class="bookmark__title">북마크한 프로젝트/스터디</div>
        <section class="bookmark__cards"></section>
      </div>
    );
  }

  skeletonCardRender() {
    const cards = this.container.querySelector('.bookmark__cards');
    const frag = new DocumentFragment();

    Array.from({ length: 6 }).forEach(() => {
      const skeletonCard = createDom('div', {
        className: 'card-skeleton',
      });

      new SkeletonCard({
        container: skeletonCard,
      });
      frag.appendChild(skeletonCard);
    });
    cards.appendChild(frag);
  }

  cardRender() {
    this.skeletonCardRender();
    const cards = this.container.querySelector('.bookmark__cards');
    cards.innerHTML = '';

    const frag = new DocumentFragment();

    this.state.forEach(item => {
      const card = createDom('div', {
        className: 'card-wrapper',
      });

      new Card({
        container: card,
        props: {
          type: 'bookmark',
          post: item,
        },
      });
      frag.appendChild(card);
    });
    cards.appendChild(frag);
  }

  async renderCallback() {
    this.skeletonCardRender();
  }
}
