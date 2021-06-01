import styled from '@emotion/styled';
import React, { CSSProperties, ReactElement } from 'react';
import { MenuItemWrapper, MenuItemWrapperProps } from './MenuItem.style';

export interface MenuItemProps extends MenuItemWrapperProps {
  children: ReactElement;
  title: string;
  onClick: (title: string) => void;
  style?: CSSProperties;
}

export default function MenuItem({
  children,
  title,
  active,
  onClick,
  style,
  forSubMenu = false,
}: MenuItemProps) {
  const handleClick = () => {
    onClick(title);
  };

  return (
    <MenuItemWrapper onClick={handleClick} active={active} forSubMenu={forSubMenu} style={style}>
      {children}
      <span>{title}</span>
    </MenuItemWrapper>
  );
}
