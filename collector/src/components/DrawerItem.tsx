import React, { ReactElement } from 'react';

import { DrawerItemWrapper } from './DrawerItem.style';

interface DrawerItemProps {
  link: string;
  title: string;
  onClick: (e: React.MouseEvent) => void;
}

export default function DrawerItem({ link, title, onClick }: DrawerItemProps): ReactElement {
  return (
    <DrawerItemWrapper>
      <a href={link} onClick={onClick}>
        {title}
      </a>
    </DrawerItemWrapper>
  );
}
