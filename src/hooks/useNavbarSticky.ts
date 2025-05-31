import { useEffect, useRef, useState, RefObject } from 'react';

/**
 * Hook that detects when a target element intersects with the viewport
 * and adds a "sticky" class to the navbar element when appropriate.
 * 
 * @param navbarRef - Reference to the navbar element
 * @param options - IntersectionObserver options
 * @returns ref that should be attached to the target element (the "trigger" element)
 */
export function useNavbarSticky<T extends HTMLElement>(
  navbarRef: RefObject<HTMLElement>,
  options: IntersectionObserverInit = { threshold: [1] }
): {isIntersecting: boolean} {
  const [isIntersecting, setIsIntersecting] = useState(true);

  useEffect(() => {
    const navbar = navbarRef.current;

    if (!navbar) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      console.log(entry.intersectionRatio);
      entry.target.classList.toggle('sticky', entry.intersectionRatio < 1);
     
    }, options);

    observer.observe(navbar);

    return () => {
      observer.disconnect();
    };
  }, [navbarRef, options]);

  return {isIntersecting};
} 