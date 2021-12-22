class Component {
  $dom;

  props;

  state;

  constructor(props) {
    this.props = props;
  }

  setState = nextState => {
    this.state = nextState;
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

  appendRoot = ($root, $new, isNav = false) => {
    if (isNav) {
      if ($root.childNodes[0]) $root.replaceChild($new, $root.childNodes[0]);
      else $root.appendChild($new);
      return;
    }

    if ($root.childNodes[1]) $root.replaceChild($new, $root.childNodes[1]);
    else $root.appendChild($new);
  };

  addEvent = () => {};

  render = () => {};
}

export default Component;
