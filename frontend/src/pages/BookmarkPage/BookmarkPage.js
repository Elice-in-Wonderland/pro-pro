import axiosInstance from '../../utils/api';
import Component from '../../components/component';
import Card from '../../components/Card/Card';
import styles from './bookmarkPage.scss';

export default class BookmarkPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'bookmark-page-wrapper' });

    this.updateCards();

    this.appendRoot(props, this.$dom);
  }

  updateCards = async () => {
    await this.getData();
    this.render();
    this.createCard();
    this.addEvent();
  };

  getData = async () => {
    await axiosInstance
      .get('/users/mark?category=project&page=1&perPage=10', {
        withCredentials: true,
      })
      .then(res => {
        return res.data.data;
      })
      .then(cards => {
        this.state = cards;
      });
  };

  render = () => {
    this.$dom.innerHTML = `
      <section class="filter-buttons">
        <button type="button" id="bookmark-button">북마크한 프로젝트/스터디</button>
      </section>
      <section class="cards">
        <div class="card-elements"></div>
      </section>
    `;
  };

  createCard = () => {
    const cards = this.$dom.querySelector('.card-elements');

    const $createFrag = document.createDocumentFragment();

    this.cardList = this.state.map(item => {
      const newCard = new Card({
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
  };

  addEvent = () => {
    const bookmarkBtn = this.$dom.querySelector('#bookmark-button');

    bookmarkBtn.addEventListener('click', () => {
      this.updateCards();
    });
  };
}
