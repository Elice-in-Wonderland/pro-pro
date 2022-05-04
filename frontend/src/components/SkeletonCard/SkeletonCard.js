import CustomComponent from '../CustomComponent';
import './skeletonCard.scss';

export default class SkeletonCard extends CustomComponent {
  markup() {
    return `
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
  }

  renderCallback() {
    this.props.fragment.appendChild(this.container);
  }
}
