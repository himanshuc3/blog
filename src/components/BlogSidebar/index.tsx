import React from 'react';
import { Link } from 'gatsby';
// import { useActiveSection } from '../../hooks/useActiveSection';
import './index.scss';

interface TableOfContentsItem {
  url: string;
  title: string;
  items?: TableOfContentsItem[];
}

interface BlogSidebarProps {
  tableOfContents: {
    items?: TableOfContentsItem[];
  };
  isDarkTheme?: boolean;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ tableOfContents, isDarkTheme }) => {
  //   const activeSection = useActiveSection(tableOfContents);

  const renderTocItems = (items?: TableOfContentsItem[]) => {
    if (!items) return null;

    return (
      <ul className="toc-list">
        {items.map((item, index) => {
          //   const isActive = item.url.slice(1) === activeSection;
          return (
            <li key={index} className="toc-item">
              <a
                href={item.url}
                className={`toc-link ${true ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item.url.slice(1));
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item.title}
              </a>
              {item.items && renderTocItems(item.items)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={`blog-sidebar ${isDarkTheme ? 'dark' : ''}`}>
      <h3 className="sidebar-title">Table of Contents</h3>
      {renderTocItems(tableOfContents.items)}
    </div>
  );
};

export default BlogSidebar;
