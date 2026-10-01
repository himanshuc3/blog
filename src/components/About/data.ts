// Content for the About page lives here so copy can be updated without touching components.
export interface Project {
  name: string;
  description: string;
  /** Source, paper, package...: shown as buttons in the window's footer. */
  actions: {
    name: string;
    link: string;
    /** Styled as the main button, like "Live" (for a project whose home is, say, its npm page). */
    primary?: boolean;
  }[];
  /** Where the project is deployed; adds a "Live" button after the actions. */
  live?: string;
  /** Not deployed yet: shows a "Coming soon" label where "Live" would be. */
  soon?: boolean;
  keywords: string[];
  tag?: string;
  emoji?: string;
  year?: string;
}

export const PROFILE = {
  role: 'Senior Frontend Engineer',
  company: 'QuillBot',
  city: 'New Delhi',
  email: 'himichhabra14@gmail.com',
  // Flip to false to hide the "Available for work" badge on the portrait.
  available: true,
};

export const PROJECTS: Project[] = [
  {
    name: 'Inkulid',
    emoji: '📐',
    description: 'A geometry-native interpreter written in Go, with a REPL.',
    keywords: ['go', 'interpreter', 'geometry'],
    actions: [{ name: 'Source', link: 'https://github.com/himanshuc3/inkulid' }],
    tag: 'ongoing',
    soon: true,
  },
  {
    name: 'Tango',
    emoji: '🇯🇵',
    description:
      'Learn Japanese while you browse: a Chrome extension that turns your tabs into short practice sessions, backed by a Go API.',
    keywords: ['go', 'typescript', 'chrome extension'],
    // The repo is called tsunuga; the project inside it is tango.
    actions: [{ name: 'Source', link: 'https://github.com/himanshuc3/tsunuga' }],
    // The Chrome Web Store listing: where the extension is installed from.
    live: 'https://chromewebstore.google.com/detail/tango/ngkiklhogamaagajeonapemmiolpmhhh',
    tag: 'mvp',
  },
  {
    name: 'Convex hull algorithms',
    emoji: '📃',
    description:
      'A paper proposing constant-workspace convex hull algorithms, under the guidance of Prof. R. Inkulu.',
    keywords: ['geometry', 'convex hull', 'DSA'],
    actions: [{ name: 'Paper', link: 'https://arxiv.org/abs/2411.10043' }],
    year: '2024',
  },
  {
    name: 'File Organizer',
    emoji: '🗂️',
    description: 'A CLI tool to declutter your assets and soothe your OCD.',
    keywords: ['node.js', 'typescript', 'linux'],
    actions: [
      { name: 'Source', link: 'https://github.com/himanshuc3/file-organize' },
      { name: 'npm', link: 'https://www.npmjs.com/package/file-organize', primary: true },
    ],
  },
];
