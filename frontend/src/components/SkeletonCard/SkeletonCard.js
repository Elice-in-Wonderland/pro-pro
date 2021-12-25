import Component from '../component';
import './skeletonCard.scss';

export default class SkeletonCard extends Component {
  constructor(props) {
    super(props);

    this.$dom = this.createDom('div', {
      className: 'card-skeleton',
    });

    this.render();
  }

  render = () => {
    this.$dom.innerHTML = `
        <div class="card-body"></div>
        <div class="card-info-wrapper">
            <div class="card-info">
                <div class="card-info-detail">
                    <div class="text">${'  '}</div>
                </div>
                <div class="card-info-detail">
                    <div class="text">${'  '}</div>
                </div>
            </div>
        </div>
    `;
  };
}
