export function noop() {}

export const isBrowser = () => typeof window !== 'undefined';

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
  isLeading = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let hasExecuted = false;

  return function (this: any, ...args: Parameters<T>): void {
    const context = this;

    if (isLeading && !hasExecuted) {
      func.apply(context, args);
      hasExecuted = true;
      return;
    }

    clearTimeout(timeout as NodeJS.Timeout);

    timeout = setTimeout(() => {
      if (!isLeading || hasExecuted) {
        func.apply(context, args);
      }
      hasExecuted = false;
    }, delay);
  };
}
