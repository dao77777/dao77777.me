export function debounce(func, wait) {
  let timeout = null;
  return function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      func(...arguments);
      timeout = null;
    }, wait);
  }
}