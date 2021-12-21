import Component from '../component';
import javascriptImage from '../../assets/images/javascript.png';
import viewImage from '../../assets/images/view.png';
import bookmarkImage from '../../assets/images/bookmark.png';
import styles from './card.scss';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: `card-wrapper`,
    });

    this.render();
  }

  render = () => {
    this.$dom.insertAdjacentHTML(
      'beforeend',
      `<div class="card-img">
            <img src="${javascriptImage}" />
        </div>
        <div class="card-body">
            <div class="card-title">${this._props.title}</div>
            <div class="card-info-wrapper">
                <div class="card-info">
                    <div class="card-info-detail">
                        <div class="text">${this._props.area}</div>
                    </div>
                    <div class="card-info-detail">
                        <div class="text">${this._props.number}명</div>
                    </div>
                </div>
                <div class="card-info-number">
                    <div class="card-info-number-detail">
                        <img src="${viewImage}"/>
                        <div>${this._props.view}</div>
                    </div>
                    <div class="card-info-number-detail">
                        <img src="${bookmarkImage}"/>
                        <div>${this._props.bookmark}</div>
                    </div>
                </div>
                </div>
            </div>
        </div>
      `,
    );
  };

  //   addEvent = () => {
  //     this.$dom
  //       .querySelector(`.${styles['confirm-button']}`)
  //       .addEventListener('click', this._props.onClickOk);
  //   };
}
