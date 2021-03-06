import axiosInstance from '../../utils/api';
import Card from '../../components/Card/Card';
import './bookmarkPage.scss';
import Component from '../../components/Component';
import { createDom } from '../../utils/dom';
import Toast from '../../components/Toast/Toast';
import Loading from '../../components/Loading/Loading';
import WebRequestController from '../../router/WebRequestController';
import { isCanceledRequest } from '../../utils/common';

export default class BookmarkPage extends Component {
  init() {
    this.state = { isLoading: true, cards: [] };
  }

  async mounted() {
    try {
      const {
        data: { data },
      } = await axiosInstance.get(
        '/users/mark?category=project&page=1&perPage=10',
        {
          signal: WebRequestController.getController()?.signal,
        },
      );

      const cards = data;

      this.setState({ ...this.state, isLoading: false, cards });
    } catch (e) {
      if (isCanceledRequest(e)) return;
      new Toast({ content: '북마크 정보 불러오기 실패', type: 'fail' });
    }
  }

  markup() {
    if (this.state.isLoading) return Loading();
    return (
      <div class="bookmark">
        <div class="bookmark__title">북마크한 프로젝트/스터디</div>
        <section class="bookmark__cards"></section>
      </div>
    );
  }

  cardRender() {
    const cards = this.container.querySelector('.bookmark__cards');

    const frag = new DocumentFragment();

    this.state.cards.forEach(item => {
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

  renderCallback() {
    if (!this.state.isLoading) this.cardRender();
  }
}
