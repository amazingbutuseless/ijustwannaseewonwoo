import React, { MouseEvent } from 'react';
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
  return (
    <BreadcrumbWrapper>
      {depths &&
        depths.map((depth) => {
          const handleClick = (e: MouseEvent) => {
            e.preventDefault();

            if (depth.path) {
              onClick(depth.path);
            }
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
