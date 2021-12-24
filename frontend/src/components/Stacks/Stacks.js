import Component from '../component';
import './stacks.scss';

export default class Stacks extends Component {
  constructor(props) {
    super(props);
    this.$dom = this.createDom('ul', {
      className: 'stackList',
    });
    this.detailRender();
  }

  detailRender = () => {
    this.$dom.innerHTML = this.props.stacks
      .map(item => {
        return `<li>${item}</li>`;
      })
      .join('');
  };
}
