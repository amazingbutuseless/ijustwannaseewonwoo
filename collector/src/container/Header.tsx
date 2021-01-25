import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';

import { HeaderWrapper } from './Header.style';

import Logo from '../components/Logo';

export default function Header() {
  const [path, updatePath] = useState('/');
  const location = useLocation();
  const { channelId } = useParams();

  useEffect(() => {
    updatePath(location.pathname);
  }, [location]);

  const isRoot = () => {
    return path === '/';
  };

  return (
    <HeaderWrapper>
      {isRoot() && <Logo />}

      {!isRoot() && (
        <a href="#" onClick={() => history.back()}>
          &lt;
        </a>
      )}

      {!isRoot() && path.startsWith('/channel') && <h2>{channelId} Videos</h2>}
    </HeaderWrapper>
  );
}
