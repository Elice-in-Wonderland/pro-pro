let currentObserver = null;

const debounceFrame = callback => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback);
    currentCallback = requestAnimationFrame(callback);
  };
};

export const observe = fn => {
  currentObserver = debounceFrame(fn);
  fn();
  currentObserver = null;
};
export const observable = obj => {
  Object.keys(obj).forEach(key => {
    let _value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set(value) {
        if (_value === value) return;
        if (
          JSON.stringify(_value) === JSON.stringify(value) &&
          typeof JSON.stringify(_value) !== 'undefined'
        )
          return;
        _value = value;
        observers.forEach(fn => fn());
      },
    });
  });
  return obj;
};
