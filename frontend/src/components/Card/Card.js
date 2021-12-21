import Component from '../component';
import viewImage from '../../assets/images/view.png';
import bookmarkImage from '../../assets/images/bookmark.png';
import CardImage from '../CardImage/CardImage';
import styles from './card.scss';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: 'card-wrapper',
    });

    this.render();
  }

  render = () => {
    this.$dom.innerHTML = `
        <div class="card-img">
          <div class="image"></div>
        </div>
        <div class="card-body">
            <div class="card-title">${this.props.title}</div>
            <div class="card-info-wrapper">
                <div class="card-info">
                    <div class="card-info-detail">
                        <div class="text">${this.props.sido}</div>
                    </div>
                    <div class="card-info-detail">
                        <div class="text">${this.props.capacity}명</div>
                    </div>
                </div>
                <div class="card-info-number">
                    <div class="card-info-number-detail">
                        <img src="${viewImage}"/>
                        <div>${this.props.views}</div>
                    </div>
                    <div class="card-info-number-detail">
                        <img src="${bookmarkImage}"/>
                        <div>${this.props.capacity}</div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    `;
    this.addEvent();
  };

  addEvent = () => {
    const images = this.$dom.querySelector('.image');
    this.replaceElement(images, new CardImage(this.props.stacks).$dom);
  };
}
