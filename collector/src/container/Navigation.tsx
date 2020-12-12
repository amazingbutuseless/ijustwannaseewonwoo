import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from '@emotion/styled';

import Logo from '../components/Logo';
import Channels from './Channels';

const NavigationWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem;
  width: 8.4rem;
  height: 100vh;
  border-right: 1px solid #efefef;
  box-sizing: border-box;
  z-index: 2;
`;

export default function Navigation() {
  const history = useHistory();

  const onClick = (channelId: string) => {
    history.push(`/channel/${channelId}`);
  };

  return (
    <NavigationWrapper>
      <Link to="/">
        <Logo />
      </Link>
      <Channels onClick={onClick} />
    </NavigationWrapper>
  );
}
