import axiosInstance from '../../utils/api';
import Component from '../../components/Component';
import Card from '../../components/Card/Card';
import RecommendNoResult from '../../components/RecommendNoResult/RecommendNoResult';
import './recommendPage.scss';
import { createDom, replaceElement } from '../../utils/dom';
import Toast from '../../components/Toast/Toast';
import Loading from '../../components/Loading/Loading';
import WebRequestController from '../../router/WebRequestController';
import { isCanceledRequest } from '../../utils/common';

export default class RecommendPage extends Component {
  init() {
    this.state = { isLoading: true, cards: [] };
  }

  async mounted() {
    try {
      const {
        data: { data },
      } = await axiosInstance.get('/posts/recommendation/me', {
        signal: WebRequestController.getController()?.signal,
      });

      const cards = data;

      this.setState({ ...this.state, isLoading: false, cards });
    } catch (e) {
      if (isCanceledRequest(e)) return;
      new Toast({ content: '추천 정보 불러오기 실패', type: 'fail' });
    }
  }

  markup() {
    if (this.state.isLoading) return Loading();
    return (
      <div class="recommend">
        <section class="recommend__comment">
          <p>프로필에서 본인의 지역과 관심 기술을 설정하세요.</p>
          <p>여러분께 맞춤형 프로젝트와 스터디를 추천해드려요.</p>
        </section>
        <section class="recommend__cards"></section>
      </div>
    );
  }

  cardRender() {
    const cards = this.container.querySelector('.recommend__cards');

    if (!this.state.cards.length) {
      cards.classList.add('recomment__no-result-contents');
      cards.classList.remove('recommend__cards');
      const recommendNoResult = new RecommendNoResult({ container: cards });
      replaceElement(cards, recommendNoResult.container);
      return;
    }

    const frag = new DocumentFragment();

    this.state.cards.forEach(item => {
      const card = createDom('div', {
        className: 'card-wrapper',
      });
      new Card({
        container: card,
        props: {
          type: 'recommend',
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
