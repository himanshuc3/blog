// Copy and asset slots for the scrapbook home page. Edit here, not in the components.
//
// Assets: every `src` below is null on purpose and renders a labelled placeholder. Drop an image
// into src/images/scrapbook/, import it here, and set `src`. Nothing else needs to change.
import nameIsAudio from '../../images/eminem-my-name-cropped.mp3';
import quillbotLogo from '../../images/quillbot.webp';
import rapyutaLogo from '../../images/rapyuta.png';
import razorpayLogo from '../../images/razorpay.png';
import zetaLogo from '../../images/zeta.svg';
import heroPlaceholder from '../../images/scrapbook/hero-placeholder.svg';
import { PROFILE } from '../About/data';
import { SOCIAL_LINKS } from '../../utils/constants';

export { PROFILE, SOCIAL_LINKS };

export const RESUME_URL =
  'https://drive.google.com/file/d/1FP0_-j3YMKtRxoqHqJlEh6jozooPkPlw/view?usp=sharing';

export const NAME = 'himanshu chhabra';
// Label pills, parked for now (see the commented block in Hero.tsx).
export const TAGS = ['Fullstack Engineer', 'Writing about adventures'];

/** The statement under the name, one array per line. `em` runs are set dark; the rest is muted. */
export const TAGLINE: { text: string; em?: boolean }[][] = [
  [{ text: 'Building from ' }, { text: 'first principles.', em: true }],
  [{ text: 'Leveraging AI', em: true }, { text: ' to move fast' }],
];
// export const HEADLINE = 'Milliseconds matter. So do pixels.';
export const HEADLINE = '';

/**
 * The hero poster image. Ships with an SVG placeholder landscape; point this at your own painted
 * or photographed image (any format) and the hero uses it as-is.
 */
export const HERO_BG: string = heroPlaceholder;

export const ABOUT = {
  heading: ['A little', 'about me'],
  paragraphs: [
    'I care about rendering performance, accessibility and the unglamorous details that make a product feel fast. I build across the stack, mostly TypeScript, React and Go, and I am slowly upgrading my brain to web3.',
    `Based in ${PROFILE.city}, currently at ${PROFILE.company}. I also write about JavaScript, Go and computational geometry, usually after breaking something first.`,
  ],
  signoff: 'articles of insignificance, code of moderate significance.',
};

export interface StickerDef {
  id: string;
  label: string;
  src: string | null;
  /** Offset from the hero's centre line, in design px (scaled down on narrow screens). */
  x: number;
  /** Distance up from the bottom of the sticker row, in design px. */
  y: number;
  w: number;
  h: number;
  rotate: number;
  shape: 'round' | 'rect' | 'blob';
  z?: number;
}

export const HERO_STICKERS: StickerDef[] = [
  { id: 'flower', label: 'sticker: flower', src: null, x: -470, y: -40, w: 240, h: 240, rotate: -8, shape: 'blob', z: 3 },
  { id: 'coffee', label: 'sticker: iced coffee', src: null, x: -330, y: 110, w: 130, h: 220, rotate: 6, shape: 'rect', z: 2 },
  { id: 'buds', label: 'sticker: earbuds', src: null, x: 240, y: 190, w: 150, h: 110, rotate: -10, shape: 'blob', z: 1 },
  { id: 'mascot', label: 'sticker: you, in sunglasses', src: null, x: 400, y: -30, w: 230, h: 270, rotate: 5, shape: 'blob', z: 3 },
];

export const WORK = {
  heading: 'projects',
  script: 'things i’ve built',
};

export const CONTACT = {
  heading: 'let’s talk',
  script: ['connection. presence. join the conversation', 'there is a place for every idea'],
  footnote: 'made with mild panic and Gatsby',
};

export const WRITING = {
  script: 'notes to self',
  heading: ['recent', 'writing'],
};

/** The "my name is" easter egg (hover the name). Times are seconds. */
export const NAME_IS = {
  src: nameIsAudio,
  /** Playback runs from `start` until the clip ends (or `end`, if you shorten it). */
  start: 0,
  end: Infinity,
  /** Moments "my name is" is spoken; a text pop appears at each. */
  cues: [2, 3, 4, 7, 8, 9] as number[],
  /** How long each pop stays on screen (ms). */
  popMs: 500,
  text: 'my name is',
  volume: 0.7,
  /** Shown in the now-playing card. */
  title: 'my name is',
  artist: 'Eminem',
  album: 'The Slim Shady LP',
  year: '1999',
};

export interface HistoryRow {
  period: string;
  org: string;
  role: string;
  /** Optional logo image, shown at the right edge of the row. */
  logo?: string;
  /** Logo is dark artwork on a transparent background: lighten it on the dark theme. */
  lightenOnDark?: boolean;
}

/** Work and study, newest first. */
export const WORK_HISTORY: HistoryRow[] = [
  { period: 'Present', org: 'QuillBot', role: 'SDE II', logo: quillbotLogo },
  { period: '2024–2025', org: 'Razorpay', role: 'Product Development Engineer II', logo: razorpayLogo, lightenOnDark: true },
  { period: '2022–2024', org: 'IIT Guwahati', role: 'Postgraduate studies' },
  { period: '2021–2022', org: 'Zeta', role: 'Frontend Engineer 2', logo: zetaLogo },
  { period: '2019–2021', org: 'Rapyuta Robotics', role: 'Frontend Engineer', logo: rapyutaLogo, lightenOnDark: true },
];
