import { vDomToNode } from '../utils/jsx-runtime';

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
    const vDOM = this.markup();

    // TODO: JSX관련해서 수정되면 제거
    if (typeof vDOM === 'string') this.container.innerHTML = vDOM;
    else {
      const fragment = new DocumentFragment();
      vDomToNode(vDOM, fragment);
      this.container?.replaceChildren(fragment);
    }

    this.renderCallback();
  }

  markup() {}

  renderCallback() {}

  setEvent() {}
}

export default CustomComponent;
