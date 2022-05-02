export const availFiltter = dataList => {
  const today = new Date();
  const statelist = dataList.filter(
    post => post.registerDeadline >= today.toISOString(),
  );
  return statelist;
};

export const populateSort = dataList => {
  const statelist = dataList.sort(
    (view1, view2) => parseFloat(view2.views) - parseFloat(view1.views),
  );
  return statelist;
};

export const recentSort = dataList => {
  const statelist = dataList.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });
  return statelist;
};

export const toggleButton = (activated, deactivated) => {
  activated.classList.add('activated');
  deactivated.classList.remove('activated');
};

export function debounce(eventHandlerFunc, leading = true) {
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
