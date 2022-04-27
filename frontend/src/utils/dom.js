const createDom = (tagName, attrs) => {
  const dom = document.createElement(tagName);
  for (const [key, value] of Object.entries(attrs)) {
    dom[key] = value;
  }
  return dom;
};

const replaceElement = (oldEl, newEl) => {
  oldEl.parentElement.replaceChild(newEl, oldEl);
};

const appendRoot = (root, newEl, isNav = false) => {
  if (isNav) {
    if (root.childNodes[0]) root.replaceChild(newEl, root.childNodes[0]);
    else root.appendChild(newEl);
    return;
  }

  if (root.childNodes[1]) root.replaceChild(newEl, root.childNodes[1]);
  else root.appendChild(newEl);
};

const setEvent = (container, eventType, selector, callback) => {
  const children = [...container.querySelectorAll(selector)];
  const isTarget = target =>
    children.includes(target) || target.closest(selector);
  container.addEventListener(eventType, event => {
    if (!isTarget(event.target)) return false;
    callback(event);
  });
};

export { createDom, replaceElement, appendRoot, setEvent };
