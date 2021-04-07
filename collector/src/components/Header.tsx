import React from 'react';
import { useLocation } from 'react-router';

import { HeaderWrapper } from './Header.style';

import Logo from './Logo';
import BackButton from './BackButton';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = '' }: HeaderProps) {
  const location = useLocation();

  const isIndex = () => {
    return location.pathname === '/';
  };

  return (
    <HeaderWrapper>
      {isIndex() ? <Logo /> : <BackButton />}

      {title && <h2>{title}</h2>}
    </HeaderWrapper>
  );
}
