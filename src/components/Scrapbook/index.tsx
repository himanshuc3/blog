import React from 'react';

import Layout from './Layout';
import Hero from './Hero';
import About from './About';
import Writing from './Writing';

export { default as Layout } from './Layout';
export { default as Hero } from './Hero';
export { default as About } from './About';
export { default as Work } from './Work';
export { default as Writing } from './Writing';
export { default as Contact } from './Contact';

/** Home: the poster, a little about me, and recent writing. Nothing else. */
const Home: React.FC = () => (
  <Layout noise>
    <Hero />
    <About />
    <Writing />
  </Layout>
);

export default Home;
