import Component from '../component';

export default class Button extends Component {
  constructor(props) {
    super(props);
    // top node
    this.$dom = this.createDom('button', {
      className: props.className,
    });

    this.render();
    this.addEvent();
  }

  render = () => {
    this.$dom.innerHTML = `
      <span>${this.props.buttonText}</span>
    `;
  };

  addEvent = () => {
    this.$dom.addEventListener('click', () => {
      this.props.onClick();
    });
  };
}
