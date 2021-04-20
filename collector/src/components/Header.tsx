import React from 'react';
import { useLocation } from 'react-router';

import { HeaderWrapper } from './Header.style';

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
    <HeaderWrapper style={{ marginTop: '30px' }}>
      {isIndex() && <BackButton />}

      {title && <h2>{title}</h2>}
    </HeaderWrapper>
  );
}
