class Component {
  $dom;

  props;

  state;

  constructor(props) {
    this.props = props;
  }

  setState = nextState => {
    this._state = nextState;
    this.render();
  };

  createDom = (tagName, attrs) => {
    const $dom = document.createElement(tagName);
    for (const [key, value] of Object.entries(attrs)) {
      $dom[key] = value;
    }
    return $dom;
  };

  replaceElement = ($old, $new) => {
    $old.parentElement.replaceChild($new, $old);
  };

  addEvent = () => {};

  render = () => {};
}

export default Component;
