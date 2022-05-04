class CustomComponent {
  constructor({ container, props }) {
    this.container = container;
    this.props = props;

    this.init();
    this.render();
    this.mounted();
    this.setEvent();
  }

  init() {}

  mounted() {}

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.container.innerHTML = this.markup();
    this.renderCallback();
  }

  markup() {}

  renderCallback() {}

  setEvent() {}
}

export default CustomComponent;
