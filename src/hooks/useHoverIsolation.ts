import { useEffect } from 'react';

function useHoverIsolation(containerSelector, itemSelector, excludedClass = 'dimmed') {
  useEffect(() => {
    // Sanity check for container element
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const handleMouseOver = (e) => {
      const hoveredItem = e.target.closest(itemSelector);
      if (!hoveredItem || !container.contains(hoveredItem)) return;

      const items = container.querySelectorAll(itemSelector);
      items.forEach((item) => {
        if (item !== hoveredItem) {
          item.classList.add(excludedClass);
        } else {
          item.classList.remove(excludedClass);
        }
      });
    };

    const handleMouseOut = (e) => {
      const leavingFrom = e.target.closest(itemSelector);
      const goingTo = e.relatedTarget?.closest(itemSelector);

      // If we're leaving an item and not going into another item
      if (leavingFrom && !goingTo) {
        const items = container.querySelectorAll(itemSelector);
        items.forEach((item) => item.classList.remove(excludedClass));
      }
    };

    container.addEventListener('mouseover', handleMouseOver);
    container.addEventListener('mouseout', handleMouseOut);

    return () => {
      container.removeEventListener('mouseover', handleMouseOver);
      container.removeEventListener('mouseout', handleMouseOut);
    };
  }, [containerSelector, itemSelector, excludedClass]);
}

export default useHoverIsolation;
