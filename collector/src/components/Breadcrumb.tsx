import React from 'react';
import { useHistory } from 'react-router-dom';

import { BreadcrumbWrapper } from './Breadcrumb.style';

export interface LocationDepth {
  title: string;
  path: string;
}

export interface LocationDepths {
  depths: Array<LocationDepth>;
}

export interface BreadcrumbProps extends LocationDepths {
  onClick: (path: string) => void;
}

export default function Breadcrumb({ depths, onClick }: BreadcrumbProps) {
  const history = useHistory();

  return (
    <BreadcrumbWrapper>
      {depths &&
        depths.map((depth) => {
          const handleClick = () => {
            if (depth.path === '#') return;

            onClick(depth.path);
          };

          return (
            <a key={depth.path} href="#" onClick={handleClick}>
              {depth.title}
            </a>
          );
        })}
    </BreadcrumbWrapper>
  );
}
