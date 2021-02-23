import React, { ReactElement } from 'react';

import { DrawerUserMenuWrapper } from './DrawerUserMenu.style';

import UserSignedIn from '../features/user/UserSignedIn';

export interface DrawerUserMenuProps {
  children: ReactElement<typeof UserSignedIn>;
  onLinkClick: (e: React.MouseEvent) => void;
}

export default function DrawerUserMenu({
  children,
  onLinkClick,
}: DrawerUserMenuProps): ReactElement {
  return (
    <DrawerUserMenuWrapper>
      {children}
      <br />
      <a href="/about" onClick={onLinkClick}>
        ijustwannaseewonwoo
      </a>
    </DrawerUserMenuWrapper>
  );
}
