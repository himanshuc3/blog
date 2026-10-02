import { canRunOneko } from './canRun';
import sprite from './oneko.gif';

// Ported from oneko.js (https://github.com/adryd325/oneko.js, MIT, (c) 2022 adryd).
// The sheet is 8 x 4 cells of 32px; each entry below is a [col, row] cell.
const SIZE = 32;
const HALF = SIZE / 2;
const SPEED = 10;
const TICK_MS = 100;
const NEAR = 48;

type Cell = readonly [number, number];
const SPRITES: Record<string, readonly Cell[]> = {
  idle: [[3, 3]],
  alert: [[7, 3]],
  scratchSelf: [
    [5, 0],
    [6, 0],
    [7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, 1],
  ],
  scratchWallS: [
    [7, 1],
    [6, 2],
  ],
  scratchWallE: [
    [2, 2],
    [2, 3],
  ],
  scratchWallW: [
    [4, 0],
    [4, 1],
  ],
  tired: [[3, 2]],
  sleeping: [
    [2, 0],
    [2, 1],
  ],
  N: [
    [1, 2],
    [1, 3],
  ],
  NE: [
    [0, 2],
    [0, 3],
  ],
  E: [
    [3, 0],
    [3, 1],
  ],
  SE: [
    [5, 1],
    [5, 2],
  ],
  S: [
    [6, 3],
    [7, 2],
  ],
  SW: [
    [5, 3],
    [6, 1],
  ],
  W: [
    [4, 2],
    [4, 3],
  ],
  NW: [
    [1, 0],
    [1, 1],
  ],
};

/**
 * Starts a tiny cat that chases the cursor and returns a function that removes it. One fixed <div>
 * whose spritesheet cell is swapped every 100ms and which is moved with `transform` (compositor only).
 * Deliberately not a React component: Gatsby renders everything in `wrapRootElement` a second time into
 * the hidden root it uses for each page's `Head`, which put two cats on screen. Call it once from
 * `onInitialClientRender`; it then keeps its position across client-side navigations.
 *
 * It starts asleep beside the nav pill and only follows the cursor once it has been clicked. Desktop
 * only: skipped for touch / coarse pointers, narrow viewports and reduced motion.
 */
export function startOneko(): () => void {
  if (!canRunOneko() || document.getElementById('oneko')) return () => {};

  const el = document.createElement('div');
  el.id = 'oneko';
  el.setAttribute('aria-hidden', 'true');
  Object.assign(el.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    width: `${SIZE}px`,
    height: `${SIZE}px`,
    pointerEvents: 'auto',
    cursor: 'pointer',
    imageRendering: 'pixelated',
    willChange: 'transform',
    zIndex: '2147483647',
    backgroundImage: `url(${sprite})`,
  });

  let catX = 32;
  let catY = 32;
  let mouseX = 0;
  let mouseY = 0;
  let asleep = true;
  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation: string | null = null;
  let idleFrame = 0;

  const place = () => {
    el.style.transform = `translate3d(${catX - HALF}px, ${catY - HALF}px, 0)`;
  };
  const setSprite = (name: string, frame: number) => {
    const set = SPRITES[name];
    const [col, row] = set[frame % set.length];
    el.style.backgroundPosition = `${-col * SIZE}px ${-row * SIZE}px`;
  };
  const resetIdle = () => {
    idleAnimation = null;
    idleFrame = 0;
  };

  const idle = () => {
    idleTime += 1;

    // Roughly every 20 seconds, once the cat has been sitting for a bit.
    if (idleTime > 10 && idleAnimation === null && Math.floor(Math.random() * 200) === 0) {
      const options = ['sleeping', 'scratchSelf'];
      if (catX < SIZE) options.push('scratchWallW');
      if (catY < SIZE) options.push('scratchWallN');
      if (catX > window.innerWidth - SIZE) options.push('scratchWallE');
      if (catY > window.innerHeight - SIZE) options.push('scratchWallS');
      idleAnimation = options[Math.floor(Math.random() * options.length)];
    }

    switch (idleAnimation) {
      case 'sleeping':
        if (idleFrame < 8) {
          setSprite('tired', 0);
          break;
        }
        setSprite('sleeping', Math.floor(idleFrame / 4));
        if (idleFrame > 192) resetIdle();
        break;
      case 'scratchWallN':
      case 'scratchWallS':
      case 'scratchWallE':
      case 'scratchWallW':
      case 'scratchSelf':
        setSprite(idleAnimation, idleFrame);
        if (idleFrame > 9) resetIdle();
        break;
      default:
        setSprite('idle', 0);
        return;
    }
    idleFrame += 1;
  };

  const tick = () => {
    frameCount += 1;

    // Asleep: just breathe (the two sleeping frames, every 400ms) until clicked.
    if (asleep) {
      if (frameCount % 4 === 0) setSprite('sleeping', frameCount / 4);
      return;
    }

    const dx = catX - mouseX;
    const dy = catY - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < SPEED || distance < NEAR) {
      idle();
      return;
    }

    resetIdle();

    // Notice the cursor first, then start running.
    if (idleTime > 1) {
      setSprite('alert', 0);
      idleTime = Math.min(idleTime, 7) - 1;
      return;
    }

    let direction = dy / distance > 0.5 ? 'N' : '';
    direction += dy / distance < -0.5 ? 'S' : '';
    direction += dx / distance > 0.5 ? 'W' : '';
    direction += dx / distance < -0.5 ? 'E' : '';
    setSprite(direction, frameCount);

    catX -= (dx / distance) * SPEED;
    catY -= (dy / distance) * SPEED;
    catX = Math.min(Math.max(HALF, catX), window.innerWidth - HALF);
    catY = Math.min(Math.max(HALF, catY), window.innerHeight - HALF);
    place();
  };

  const onMove = (e: PointerEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  let timer: ReturnType<typeof setInterval> | undefined;
  const start = () => {
    if (timer === undefined) timer = setInterval(tick, TICK_MS);
  };
  const stop = () => {
    clearInterval(timer);
    timer = undefined;
  };
  // No work while the tab is in the background.
  const onVisibility = () => (document.hidden ? stop() : start());

  // Beside the nav pill, vertically centred on it; falls back to where the pill would be.
  const settleBesideNav = () => {
    const pill = document.querySelector('.scrap-nav__pill')?.getBoundingClientRect();
    catX = (pill ? pill.right : window.innerWidth / 2 + 100) + 12 + HALF;
    catY = pill ? pill.top + pill.height / 2 : 42;
    place();
  };
  const onResize = () => {
    if (asleep) settleBesideNav();
  };

  const wake = (e: MouseEvent) => {
    asleep = false;
    mouseX = e.clientX;
    mouseY = e.clientY;
    el.style.pointerEvents = 'none';
    el.style.cursor = '';
    el.removeEventListener('click', wake);
    window.removeEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    setSprite('alert', 0);
  };

  mouseX = catX;
  mouseY = catY;
  setSprite('sleeping', 0);
  settleBesideNav();
  document.body.appendChild(el);
  el.addEventListener('click', wake);
  window.addEventListener('resize', onResize, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  start();

  return () => {
    stop();
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisibility);
    el.remove();
  };
}
