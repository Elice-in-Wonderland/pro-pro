function addChild(parent, childNode) {
  // null check
  if (childNode == null) return;

  // false 일경우 아무것도 안보이게
  if (typeof childNode === 'boolean') return;

  // 배열 형식일 때
  if (Array.isArray(childNode))
    return childNode.forEach(c => addChild(parent, c));

  // object 형식일 때 이미 하위에서 node로 만들어진 것
  if (typeof childNode === 'object') {
    return parent.appendChild(childNode);
  }

  // string, number
  parent.appendChild(document.createTextNode(childNode));
}

function jsx(name, attributes = {}, ...children) {
  const node =
    name === 'fragment'
      ? document.createDocumentFragment()
      : document.createElement(name);

  if (!(node instanceof DocumentFragment)) {
    // falsy 값 방어
    Object.entries(attributes || {}).forEach(([key, value]) => {
      node.setAttribute(key, value);
    });
  }

  // 자식 노드들 처리
  children.forEach(childNode => addChild(node, childNode));

  return node;
}

export default jsx;
