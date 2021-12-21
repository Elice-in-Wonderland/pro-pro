import Component from '../component';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    // top node
    this.$dom = this.createDom('div', {
      className: props.className,
    });
  }
}
