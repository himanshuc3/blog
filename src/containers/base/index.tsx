import React, { ReactNode } from 'react';

import Skeleton from '../../components/skeleton';

interface Props {
  children: ReactNode;
  className: string;
  isScrollLoader?: boolean;
}

const BaseComponent: React.FC<Props> = ({ children, className, isScrollLoader }) => (
  <Skeleton className={className} isScrollLoader={isScrollLoader}>
    {children}
  </Skeleton>
);

export default BaseComponent;
