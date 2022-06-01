import { vDomToNode } from '../utils/jsx-runtime';

class Component {
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
    const fragment = new DocumentFragment();

    vDomToNode(vDOM, fragment);
    this.container?.replaceChildren(fragment);
    this.renderCallback();
  }

  markup() {}

  renderCallback() {}

  setEvent() {}
}

export default Component;
