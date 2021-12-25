import Component from '../component';
import './searchNoResult.scss';
import noResult from '../../assets/images/no-result-img.svg';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('div', {
      className: 'searchNotFound',
    });

    this.render();
  }

  render = () => {
    this.$dom.innerHTML = `
        <div class="no-result">
        <img
        src="${noResult}"
        alt="no result image"
        class="no-result-img"/>
        <p>
          검색 결과가 없습니다.<br>
        </p>
      </div>
      `;
  };
}
