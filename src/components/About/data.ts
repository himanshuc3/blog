// Content for the About page lives here so copy can be updated without touching components.
export interface Project {
  name: string;
  description: string;
  actions: { name: string; link: string }[];
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
    name: 'This blog',
    emoji: '🪴',
    description:
      'The site you are on. Gatsby + MDX, hand-rolled theming, and more motion than strictly necessary.',
    keywords: ['gatsby', 'typescript', 'motion'],
    actions: [{ name: 'Source', link: 'https://github.com/himanshuc3/blog' }],
    tag: 'always wip',
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
      { name: 'npm', link: 'https://www.npmjs.com/package/file-organize' },
    ],
  },
  {
    name: 'Octosnake',
    emoji: '🐍',
    description: 'A GitHub-themed snake game with twists that lure you into scoring more.',
    keywords: ['typescript', 'p5.js'],
    actions: [{ name: 'Source', link: 'https://github.com/himanshuc3/usb-snake' }],
    tag: 'unfinished',
  },
];
