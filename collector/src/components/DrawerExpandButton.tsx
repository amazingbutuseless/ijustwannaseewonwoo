import React, { ReactElement } from 'react';

import { DrawerExpandButtonWrapper } from './DrawerExpandButton.style';

interface DrawerExpandButtonProps {
  expanded: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export default function DrawerExpandButton({
  expanded,
  onClick,
}: DrawerExpandButtonProps): ReactElement {
  return (
    <DrawerExpandButtonWrapper onClick={onClick}>
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="32px"
          height="32px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          {expanded && (
            <path d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z" />
          )}
          {!expanded && <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />}
        </svg>
        <span>Expand Panel</span>
      </>
    </DrawerExpandButtonWrapper>
  );
}
