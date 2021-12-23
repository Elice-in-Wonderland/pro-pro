import axiosInstance from '../../utils/api';
import Component from '../../components/component';
import Card from '../../components/Card/Card';
import styles from './bookmarkPage.scss';

export default class BookmarkPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'bookmark-page-wrapper' });

    axiosInstance
      .get('/users/mark?category=project&page=1&perPage=10', {
        withCredentials: true,
      })
      .then(res => {
        return res.data.data;
      })
      .then(cards => {
        this.state = cards;
      });

    this.render();
    this.addEvent();

    const $fragment = document.createDocumentFragment();
    $fragment.appendChild(this.$dom);

    props.appendChild($fragment);
  }

  render = () => {
    this.$dom.innerHTML = `
      <section class="filter-buttons">
        <button type="button">내가 참여중인 프로젝트/스터디</button>
        <button type="button" id="bookmark-button">북마크한 프로젝트/스터디</button>
      </section>
      <section class="cards">
        <div class="card-elements"></div>
      </section>
    `;
  };

  addEvent = () => {
    const createCard = () => {
      const cards = this.$dom.querySelector('.card-elements');
      const $createFrag = document.createDocumentFragment();

      this.cardList = this.state.map(item => {
        const newCard = new Card({ post: item, postList: this.state });
        return newCard.$dom;
      });

      this.cardList.forEach(item => {
        $createFrag.appendChild(item);
      });
      this.replaceElement(cards, $createFrag);
    };

    const bookmarkBtn = this.$dom.querySelector('#bookmark-button');

    bookmarkBtn.addEventListener('click', () => {
      createCard();
    });
  };
}
