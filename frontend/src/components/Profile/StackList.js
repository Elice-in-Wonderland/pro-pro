import Component from '../component';

export default class StackList extends Component {
  constructor(props) {
    super(props);

    // top node
    this.$dom = this.createDom('div', {
      className: 'stack-select',
    });

    this.render();
  }

  render = () => {
    this.$dom.innerHTML = `
    `;
  };
}
