export function debounce<T>(func: (this: T, ...args: any[]) => void, wait: number) {
  let timeout: any;

  return function(this: T, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
