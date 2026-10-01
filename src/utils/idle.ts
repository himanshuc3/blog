// When to start downloads that nothing on screen is waiting for.

// How long after the page's content first paints before background downloads may start.
const SETTLE_MS = 1000;

/** True when the visitor has asked the browser to save data: skip optional downloads. */
export const saveDataOn = (): boolean =>
  Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

/**
 * Calls `cb` shortly after the page's main content has painted (its first largest-contentful-paint
 * entry), so a large download never competes with what the visitor is waiting to see. Browsers
 * that can't report it get a flat 4 s. Returns a cancel function.
 */
function afterContentPainted(cb: () => void): () => void {
  let timer = setTimeout(cb, 4000);
  let observer: PerformanceObserver | undefined;

  if (
    typeof PerformanceObserver !== 'undefined' &&
    PerformanceObserver.supportedEntryTypes?.includes('largest-contentful-paint')
  ) {
    observer = new PerformanceObserver(() => {
      observer?.disconnect();
      clearTimeout(timer);
      timer = setTimeout(cb, SETTLE_MS);
    });
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  }

  return () => {
    observer?.disconnect();
    clearTimeout(timer);
  };
}

/**
 * Calls `cb` once the page has loaded, painted its content and the browser is idle: the point
 * to start a background download (the cat's spritesheet, the "my name is" song). Browser-only.
 * Returns a cancel function.
 */
export function whenPageIdle(cb: () => void): () => void {
  let cancelled = false;
  let cancelContent = () => {};
  let idleHandle: number | undefined;
  let idleTimer: ReturnType<typeof setTimeout> | undefined;

  const runWhenIdle = () => {
    if (cancelled) return;
    if ('requestIdleCallback' in window) idleHandle = requestIdleCallback(cb);
    else idleTimer = setTimeout(cb, 200);
  };
  const start = () => {
    cancelContent = afterContentPainted(runWhenIdle);
  };

  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });

  return () => {
    cancelled = true;
    cancelContent();
    window.removeEventListener('load', start);
    if (idleHandle !== undefined) cancelIdleCallback(idleHandle);
    clearTimeout(idleTimer);
  };
}
