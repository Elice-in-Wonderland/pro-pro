import Component from '../component';
import './recommendNoResult.scss';
import noResult from '../../assets/images/no-result-img.svg';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('div', {
      className: 'recommendNotFound',
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
          추천 결과가 없습니다.<br>
        </p>
        <p>
          혹시 프로필에서 지역과 관심 기술을 설정하지 않으셨다면, 지금 해보시는게 어떠실까요? <br>
        </p>
      </div>
      `;
  };
}
