import { shell } from 'electron';

import React from 'react';
import { useHistory } from 'react-router-dom';

import { MenuWrapper } from './Menu.style';
import MenuItem from './MenuItem';

export function isActive(activeItemTitle: string, title: string) {
  return activeItemTitle === title;
}

export interface MenuProps {
  activeItem: string;
  onItemClick: (menuTitle: string) => void;
  onSignOutButtonClick: () => void;
}

export default function Menu({ activeItem, onItemClick, onSignOutButtonClick }: MenuProps) {
  const history = useHistory();

  const onClick = (title: string) => {
    history.push(`/${title.toLowerCase()}`);
    onItemClick(title);
  };

  const onIntroductionClick = () => {
    shell.openExternal(`https://amazingbutuseless.github.io`);
  };

  return (
    <MenuWrapper>
      <MenuItem title="Playlist" onClick={onClick} active={isActive(activeItem, 'Playlist')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          viewBox="0 0 24 24"
          fill="#000000"
        >
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <g>
              <rect height="2" width="11" x="3" y="10" />
              <rect height="2" width="11" x="3" y="6" />
              <rect height="2" width="7" x="3" y="14" />
              <polygon points="16,13 16,21 22,17" />
            </g>
          </g>
        </svg>
      </MenuItem>

      <MenuItem title="Video" onClick={onClick} active={isActive(activeItem, 'Video')}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M10 8v8l5-4-5-4zm9-5H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
        </svg>
      </MenuItem>

      <MenuItem
        title="Introduce"
        onClick={onIntroductionClick}
        active={false}
        forSubMenu={true}
        style={{ marginTop: 'auto' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      </MenuItem>

      <MenuItem title="SignOut" onClick={onSignOutButtonClick} active={false} forSubMenu={true}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
        </svg>
      </MenuItem>
    </MenuWrapper>
  );
}
