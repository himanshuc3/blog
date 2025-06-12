import React, { useEffect } from 'react';

const usePageScrollLoader = (ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      if (ref?.current) {
        ref.current.style.width = scrollPercent + '%';
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);
};

export default usePageScrollLoader;
