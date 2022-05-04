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
    // TODO: JSX관련해서 수정되면 제거
    const newNode = this.markup();
    if (typeof newNode === 'string') this.container.innerHTML = newNode;
    else this.container.replaceChildren(newNode);

    this.renderCallback();
  }

  markup() {}

  renderCallback() {}

  setEvent() {}
}

export default CustomComponent;
