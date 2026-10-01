import React from 'react';

// Importing the files gives their hashed URLs, the same ones fonts.scss puts in @font-face, so the
// preload is reused by the stylesheet instead of downloading twice.
import interTight from '@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2';
import homemadeApple from '@fontsource/homemade-apple/files/homemade-apple-latin-400-normal.woff2';

/**
 * Starts the two fonts the first screen needs while the HTML is still being parsed, instead of
 * waiting for the stylesheet to reveal them. Font preloads need `crossOrigin` even for same-origin
 * files, or the browser fetches them twice.
 */
const FontPreload: React.FC = () => (
  <>
    <link rel="preload" href={interTight} as="font" type="font/woff2" crossOrigin="anonymous" />
    <link rel="preload" href={homemadeApple} as="font" type="font/woff2" crossOrigin="anonymous" />
  </>
);

export default FontPreload;
