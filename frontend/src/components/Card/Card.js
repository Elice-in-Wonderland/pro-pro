import { view, bookmark } from '@assets/icons';
import Component from '../Component';
import PostBanner from '../PostBanner/PostBanner';
import './card.scss';
import RouterContext from '../../router/RouterContext';
import { shortSido } from '../../library/MainPage/index';
import { createDom, replaceElement } from '../../utils/dom';

export default class Card extends Component {
  init() {
    this.state = {
      type: this.props.type,
      post: this.props.post,
    };
  }

  makeSido(address) {
    const shortAddress = address.split(' ')[0];
    if (shortAddress === '온라인') {
      return '온라인';
    } else if (shortAddress === '세종특별자치시') {
      return `${shortSido[shortAddress]}`;
    } else if (shortAddress === '제주특별자치도') {
      return `${shortSido[shortAddress]} ${
        this.state.post.address.split(' ')[1]
      }`;
    }
    return `${address.split(' ')[0]} ${this.state.post.address.split(' ')[1]}`;
  }

  markup() {
    return (
      <div class="card">
        <div class="card__image"></div>
        <div class="card__body">
          <div class="card__body__title">{this.state.post.title}</div>
          <div class="card__body__info">
            <div class="card__body__info__content">
              <div class="card__body__info__content__detail">
                <div class="card__body__info__content__detail__text">
                  {this.makeSido(this.state.post.address)}
                </div>
              </div>
              <div class="card__body__info__content__detail">
                <div class="card__body__info__content__detail__text">
                  {this.state.post.capacity}명
                </div>
              </div>
            </div>
            <div class="card__body__info__number">
              <div class="card__body__info__number__detail">
                <img src={view} aria-label="조회수" />
                <div>{this.state.post.views}</div>
              </div>
              <div class="card__body__info__number__detail">
                <img src={bookmark} aria-label="북마크" />
                <div>{this.state.post.marks}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  setEvent() {
    const images = this.container.querySelector('.card__image');
    const card = this.container.querySelector('.card');

    const div = createDom('div', {
      className: `banner banner--${this.state.post.stacks[0]}`,
    });

    new PostBanner({
      container: div,
      props: { stacks: this.state.post.stacks },
    });

    replaceElement(images, div);

    card.addEventListener('click', () => {
      RouterContext.state.push(`/detail/${this.state.post._id}`);
    });
  }
}
