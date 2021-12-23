import Component from '../component';
import './searchNoResult.scss';

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
        <p>검색 결과가 없습니다.</p>
      `;
  };
}
