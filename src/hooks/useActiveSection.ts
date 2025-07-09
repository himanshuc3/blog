import { useState, useEffect } from 'react';

interface Section {
  id: string;
  offsetTop: number;
}

export const useActiveSection = (tableOfContents: { items?: any[] }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (!tableOfContents.items) return;

    const sections: Section[] = [];
    
    // Get all section elements
    tableOfContents.items.forEach(item => {
      const element = document.getElementById(item.url.slice(1));
      if (element) {
        sections.push({
          id: item.url.slice(1),
          offsetTop: element.offsetTop,
        });
      }
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Add offset for better UX

      // Find the current section
      const currentSection = sections.reduce((acc, section) => {
        if (scrollPosition >= section.offsetTop) {
          return section.id;
        }
        return acc;
      }, sections[0]?.id || '');

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [tableOfContents]);

  return activeSection;
}; 