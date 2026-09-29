// Copy and asset slots for the scrapbook home page. Edit here, not in the components.
//
// Assets: every `src` below is null on purpose and renders a labelled placeholder. Drop an image
// into src/images/scrapbook/, import it here, and set `src`. Nothing else needs to change.
import heroPlaceholder from '../../images/scrapbook/hero-placeholder.svg';
import { PROFILE } from '../About/data';
import { SOCIAL_LINKS } from '../../utils/constants';

export { PROFILE, SOCIAL_LINKS };

export const RESUME_URL =
  'https://drive.google.com/file/d/1FP0_-j3YMKtRxoqHqJlEh6jozooPkPlw/view?usp=sharing';

export const NAME = 'himanshu chhabra';
export const TITLE = 'Fullstack Developer';
export const HEADLINE = 'Milliseconds matter. So do pixels.';

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
