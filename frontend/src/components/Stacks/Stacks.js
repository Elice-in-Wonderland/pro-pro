import Component from '../component';
import styles from './stacks.scss';

export default class stacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stackList: props.stackList,
    };
    this.$dom = this.createDom('ul', {
      className: 'stackList',
    });
    this.detailRender();
  }

  detailRender = () => {
    this.$dom.innerHTML = this.state.stackList
      .map(item => {
        return `<li>${item}</li>`;
      })
      .join('');
  };
}
