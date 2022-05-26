export const availFilter = dataList => {
  const today = new Date();
  const stateList = dataList.filter(
    post => post.registerDeadline >= today.toISOString(),
  );
  return stateList;
};

export const populateSort = dataList => {
  const stateList = dataList.sort(
    (view1, view2) => parseFloat(view2.views) - parseFloat(view1.views),
  );
  return stateList;
};

export const recentSort = dataList => {
  const stateList = dataList.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });
  return stateList;
};

export const toggleButton = (activated, deactivated) => {
  activated.classList.add('activated');
  deactivated.classList.remove('activated');
};

export function debounce(eventHandlerFunc, leading = false) {
  let inDebounce;
  return (...args) => {
    const context = this;
    const nowCall = leading && !inDebounce;
    const later = () => {
      inDebounce = null;
      if (!leading) eventHandlerFunc.apply(context, args);
    };

    clearTimeout(inDebounce);
    inDebounce = setTimeout(later, 500);
    if (nowCall) eventHandlerFunc.apply(context, args);
  };
}
