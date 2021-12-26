import axiosInstance from '../../utils/api';
import Component from '../../components/component';
import Card from '../../components/Card/Card';
import RecommendNotFound from '../../components/RecommendNoResult/RecommendNoResult';
import './recommendPage.scss';

export default class RecommendPage extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', { className: 'recommend-page-wrapper' });

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
      .get('/posts/recommendation/me', {
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
        <button type="button" id="recommend-button">추천</button>
      </section>
      <section class="recommend-comment">
        <p>프로필에서 본인의 지역과 관심 기술을 설정하세요.</p>
        <p>여러분께 맞춤형 프로젝트와 스터디를 추천해드려요.</p>
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
        type: 'recommend',
        post: item,
        postList: this.state,
        updateCards: this.updateCards,
      });
      return newCard.$dom;
    });

    if (!this.cardList.length) {
      const cardSection = this.$dom.querySelector('.cards');
      cardSection.classList.add('recommendNotFoundContainer');
      cardSection.classList.remove('cards');
      const recommendNotFound = new RecommendNotFound();
      this.replaceElement(cards, recommendNotFound.$dom);
    } else {
      this.cardList.forEach(item => {
        $createFrag.appendChild(item);
      });
      this.replaceElement(cards, $createFrag);
    }
  };

  addEvent = () => {
    const recommendBtn = this.$dom.querySelector('#recommend-button');

    recommendBtn.addEventListener('click', () => {
      this.updateCards();
    });
  };
}
