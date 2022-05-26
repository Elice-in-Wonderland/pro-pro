/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */

function jsx(type, attributes, ...children) {
  const childrenElements = children.reduce((acc, child) => {
    if (child == null) return acc;
    if (typeof child === 'boolean') return acc;

    typeof child === 'object'
      ? acc.push(child)
      : acc.push(jsx('TEXT_NODE', { textContent: child }));

    return acc;
  }, []);

  return {
    type,
    attributes,
    children: childrenElements.flat(),
  };
}

export function vDomToNode(vDOM, container) {
  if (vDOM == null) return;

  originNode(vDOM, container);
}

function originNode(vDOM, container) {
  let newNode = null;

  if (vDOM.type === 'TEXT_NODE') {
    const { textContent } = vDOM.attributes;

    newNode = document.createTextNode(textContent);
  } else {
    newNode =
      vDOM.type === 'fragment'
        ? document.createDocumentFragment()
        : document.createElement(vDOM.type);

    if (!(newNode instanceof DocumentFragment)) {
      updateNode(newNode, vDOM);
    }
  }

  vDOM.children.forEach(child => vDomToNode(child, newNode));

  container?.appendChild(newNode);
}

function updateNode(newNode, vDOM) {
  Object.entries(vDOM.attributes || {}).forEach(([key, value]) => {
    if (key.startsWith('on')) {
      const eventType = key.slice(2).toLocaleLowerCase();
      newNode.addEventListener(eventType, value);

      return;
    }

    if (isBooleanAttribute(key) && value === false) return;

    newNode.setAttribute(key, value);
  });
}

const isBooleanAttribute = attr =>
  attr === 'disabled' || attr === 'checked' || attr === 'selected';

export default jsx;
