function debounce(func, delay = 0) {
  let timeoutId;

  return function () {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}

export {debounce};
