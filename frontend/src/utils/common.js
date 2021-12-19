function padding(value) {
  return `00${value}`.slice(-2);
}

function debounce(callback, wait = 1000) {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, wait);
  };
}

function throttle(callback, wait = 1000) {
  let timer;

  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        callback();
      }, wait);
    }
  };
}

export default {
  padding,
  debounce,
  throttle,
};
