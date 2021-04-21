import styled from '@emotion/styled';
import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { MenuItemWrapper, MenuItemWrapperProps, MenuWrapper } from './Menu.style';

export interface MenuItemProps extends MenuItemWrapperProps {
  children: ReactElement;
  title: string;
  onClick: (title: string) => void;
}

export interface MenuProps {
  activeItem: string;
  onItemClick: (menuTitle: string) => void;
}

export function isActive(activeItemTitle: string, title: string) {
  return activeItemTitle === title;
}

export function MenuItem({ children, title, active, onClick }: MenuItemProps) {
  const handleClick = () => {
    onClick(title);
  };

  return (
    <MenuItemWrapper onClick={handleClick} active={active}>
      {children}
      <span>{title}</span>
    </MenuItemWrapper>
  );
}

export default function Menu({ activeItem, onItemClick }: MenuProps) {
  const history = useHistory();

  const [showPlaylistPanel, switchPlaylistPanel] = useState(activeItem === 'Playlist');

  const onClick = (title: string) => {
    history.push(`/${title.toLowerCase()}`);
    onItemClick(title);
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
    </MenuWrapper>
  );
}
