import axiosInstance from '../../utils/api';
import Card from '../../components/Card/Card';
import './bookmarkPage.scss';
import CustomComponent from '../../components/CustomComponent';
import { createDom } from '../../utils/dom';

export default class BookmarkPage extends CustomComponent {
  init() {
    this.$dom = createDom('div', { className: 'bookmark-page-wrapper' });
    this.state = [];
    // this.appendRoot(props, this.$dom);
  }

  async mounted() {
    await axiosInstance
      .get('/users/mark?category=project&page=1&perPage=10', {
        withCredentials: true,
      })
      .then(res => {
        return res.data.data;
      })
      .then(cards => {
        this.setState(cards);
      });
  }

  markup() {
    return `
      <section class="filter-buttons">
        <button type="button" id="bookmark-button">북마크한 프로젝트/스터디</button>
      </section>
      <section class="cards">
        <div class="card-elements"></div>
      </section>
    `;
  }

  cardRender() {
    const cards = this.$dom.querySelector('.card-elements');

    const $createFrag = document.createDocumentFragment();

    this.cardList = this.state.map(item => {
      const newCard = new Card({
        type: 'bookmark',
        post: item,
        postList: this.state,
        updateCards: this.updateCards,
      });
      return newCard.$dom;
    });

    this.cardList.forEach(item => {
      $createFrag.appendChild(item);
    });

    this.replaceElement(cards, $createFrag);
  }

  renderCallback() {
    cardRender();
  }

  updateCards = async () => {
    await this.mounted();
    this.render();
  };

  setEvent = () => {
    const bookmarkBtn = this.$dom.querySelector('#bookmark-button');

    bookmarkBtn.addEventListener('click', () => {
      this.updateCards();
    });
  };
}
