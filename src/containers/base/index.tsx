import React, { ReactNode, useContext } from 'react';

import Skeleton from '../../components/skeleton';
import ThemeContext from '../../hooks/themeContext';

interface Props {
  children: ReactNode;
  className: string;
  isScrollLoader?: boolean;
}

const BaseComponent: React.FC<Props> = ({ children, className, isScrollLoader }) => {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <Skeleton
      darkTheme={darkTheme}
      className={className}
      onToggleTheme={toggleTheme}
      isScrollLoader={isScrollLoader}
    >
      {children}
    </Skeleton>
  );
};

export default BaseComponent;
