import Component from '../Component';
import './skeletonCard.scss';

export default class SkeletonCard extends Component {
  markup() {
    return (
      <div class="card-body">
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
      </div>
    );
  }
}
