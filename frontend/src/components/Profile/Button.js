import CustomComponent from '../CustomComponent';

export default class Button extends CustomComponent {
  markup() {
    return `
      <span>${this.props.buttonText}</span>
    `;
  }

  setEvent() {
    this.container.addEventListener('click', () => {
      if (this.props.cb) this.props.cb();
    });
  }
}
