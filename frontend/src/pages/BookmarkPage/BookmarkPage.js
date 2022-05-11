import axiosInstance from '../../utils/api';
import MainCard from '../../components/MainCard/MainCard';
import './bookmarkPage.scss';
import CustomComponent from '../../components/CustomComponent';
import { createDom, replaceElement } from '../../utils/dom';
import Toast from '../../components/Toast/Toast';

export default class BookmarkPage extends CustomComponent {
  init() {
    this.state = [];
  }

  setState = nextState => {
    this.state = nextState;
    this.cardRender();
  };

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
        });
    } catch (e) {
      new Toast({ content: '북마크 정보 불러오기 실패', type: 'fail' });
    }
  }

  markup() {
    return (
      <div class="bookmark-contents">
        <section class="bookmark-contents__button">
          <button type="button" id="bookmark-contents__button--button-element">
            북마크한 프로젝트/스터디
          </button>
        </section>
        <section class="bookmark-contents__cards">
          <div class="bookmark-contents__cards--card-elements"></div>
        </section>
      </div>
    );
  }

  cardRender() {
    const cards = this.container.querySelector(
      '.bookmark-contents__cards--card-elements',
    );

    const frag = document.createDocumentFragment();

    this.state.forEach(item => {
      const cardWrapper = createDom('div', {
        className: 'card-wrapper',
      });

      new MainCard({
        container: cardWrapper,
        props: {
          type: 'bookmark',
          post: item,
        },
      });
      frag.appendChild(cardWrapper);
    });
    replaceElement(cards, frag);
  }

  updateCards = async () => {
    this.render();
    await this.mounted();
    this.setEvent();
  };

  setEvent() {
    const bookmarkBtn = this.container.querySelector(
      '#bookmark-contents__button--button-element',
    );

    bookmarkBtn.addEventListener('click', () => {
      this.updateCards();
    });
  }
}
