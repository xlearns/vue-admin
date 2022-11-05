export function sleep(timer = 3000) {
  return new Promise(resolve => {
    setTimeout(resolve, timer);
  });
}

export function debounce(wait = 1000, func) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = () => {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
