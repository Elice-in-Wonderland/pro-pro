import CustomComponent from '../CustomComponent';
import viewImage from '../../assets/icons/view.svg';
import bookmarkImage from '../../assets/icons/bookmark.svg';
import PostBanner from '../PostBanner/PostBanner';
import './MainCard.scss';
import RouterContext from '../../router/RouterContext';
import { shortSido } from '../../library/MainPage/index';
import { createDom, replaceElement } from '../../utils/dom';
export default class MainCard extends CustomComponent {
  init() {
    this.state = {
      type: this.props.type,
      post: this.props.post,
    };
  }

  makeSido(address) {
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
  }

  markup() {
    return (
      <div class="card-wrap">
        <div class="image"></div>
        <div class="card-body">
          <div class="card-title">{this.state.post.title}</div>
          <div class="card-info-wrapper">
            <div class="card-info">
              <div class="card-info-detail">
                <div class="text">{this.makeSido(this.state.post.address)}</div>
              </div>
              <div class="card-info-detail">
                <div class="text">{this.state.post.capacity}명</div>
              </div>
            </div>
            <div class="card-info-number">
              <div class="card-info-number-detail">
                <img src={viewImage} aria-label="조회수" />
                <div>{this.state.post.views}</div>
              </div>
              <div class="card-info-number-detail">
                <button type="button" class="bookmark-btn" aria-label="북마크">
                  <img src={bookmarkImage} aria-label="북마크" />
                </button>
                <div>{this.state.post.marks}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  setEvent() {
    const images = this.container.querySelector('.image');
    const cardWrap = this.container.querySelector('.card-wrap');

    const div = createDom('div', {
      className: `banner ${this.state.post.stacks[0]}`,
    });

    new PostBanner({
      container: div,
      props: { stacks: this.state.post.stacks },
    });

    replaceElement(images, div);

    cardWrap.addEventListener('click', () => {
      RouterContext.state.push(`/detail/${this.state.post._id}`);
    });
  }
}
