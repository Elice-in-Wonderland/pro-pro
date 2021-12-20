import Component from '../component';

export default class Button extends Component {
  constructor(props) {
    super(props);
    // top node
    this.$dom = this.createDom('button', {
      className: 'stack-select',
    });

    this.render();
  }

  render = () => {
    this.$dom.innerHTML = `
    `;
  };
}
