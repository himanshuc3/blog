import React from 'react';

import Footer from './Footer';
import './styles.scss';

/** The homepage footer for pages outside the scrapbook layout (supplies the `.scrap` variables). */
const SiteFooter: React.FC = () => (
  <div className="scrap scrap--embed">
    <Footer />
  </div>
);

export default SiteFooter;
