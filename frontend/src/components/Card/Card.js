import Component from '../component';
import viewImage from '../../assets/icons/view.svg';
import bookmarkImage from '../../assets/icons/bookmark.svg';
import bookmarkFilledImage from '../../assets/icons/bookmark_filled.svg';
import PostBanner from '../PostBanner/PostBanner';
import './card.scss';
import axiosInstance from '../../utils/api';
import RouterContext from '../../router/RouterContext';
import Toast from '../Toast/Toast';
import { shortSido } from '../../library/MainPage/index';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      post: props.post,
      postList: props.postList,
      updateCards: props.updateCards,
    };

    this.$dom = this.createDom('div', {
      className: 'card-wrapper',
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
    <div class="card-wrap">
        <div class="image"></div>
        <div class="card-body">
            <div class="card-title">${this.state.post.title}</div>
            <div class="card-info-wrapper">
                <div class="card-info">
                    <div class="card-info-detail">
                        <div class="text">${this.makeSido(
                          this.state.post.address,
                        )}</div>
                    </div>
                    <div class="card-info-detail">
                        <div class="text">${this.state.post.capacity}명</div>
                    </div>
                </div>
                <div class="card-info-number">
                    <div class="card-info-number-detail">
                        <img src="${viewImage}" aria-label="조회수"/>
                        <div>${this.state.post.views}</div>
                    </div>
                    <div class="card-info-number-detail">
                        <button type="button" class="bookmark-btn" aria-label="북마크">
                          <img src="${bookmarkImage}" aria-label="북마크"/>
                        </button>
                        <div>${this.state.post.marks}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
  };

  makeSido = address => {
    if (address.split(' ')[0] === '온라인') {
      return '온라인';
    } else if (address.split(' ')[0] === '세종특별자치시') {
      return `${shortSido[address.split(' ')[0]]}`;
    } else if (address.split(' ')[0] === '제주특별자치도') {
      return `${shortSido[address.split(' ')[0]]} ${
        this.state.post.address.split(' ')[1]
      }`;
    }
    return `${address.split(' ')[0]} ${this.state.post.address.split(' ')[1]}`;
  };

  addEvent = () => {
    const images = this.$dom.querySelector('.image');
    const cardWrap = this.$dom.querySelector('.card-wrap');
    const bookmarkBtn = this.$dom.querySelector('.bookmark-btn');
    const bookmark = this.$dom.querySelector('.bookmark-btn').childNodes[1];

    this.replaceElement(
      images,
      new PostBanner({ stackList: this.state.post.stacks }).$dom,
    );

    cardWrap.addEventListener('click', event => {
      if (event.target !== bookmark) {
        RouterContext.state.push(`/detail/${this.state.post._id}`);
      }
      if (this.state.type === 'bookmark') {
        this.state.updateCards();
      }
    });

    if (this.state.type === 'bookmark') {
      bookmark.src = bookmarkFilledImage;
      bookmarkBtn.addEventListener('click', () => {
        bookmarkPost();
      });
    } else {
      bookmarkBtn.className = 'bookmark-btn-main';
    }

    const bookmarkPost = () => {
      for (let i = 0; i < this.state.postList.length; i++) {
        // 이미 북마크한 포스트의 북마크 버튼을 누른 경우 북마크를 해제한다.
        if (this.state.post._id === this.state.postList[i]._id) {
          axiosInstance.delete(`/users/mark/${this.state.post._id}`, {
            withCredentials: true,
          });
          break;
        }
      }
      this.state.updateCards();
      new Toast({
        timeout: 2100,
        content: '북마크가 해제되었습니다',
        type: 'success',
      });
    };
  };
}
