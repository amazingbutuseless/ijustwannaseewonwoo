import React from 'react';
import styled from '@emotion/styled';

import Logo from '../../components/Logo';
import Channels from '../Channels';

const NavigationWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem;
  width: 8.4rem;
  height: 100vh;
  border-right: 1px solid #efefef;
  box-sizing: border-box;
`;

export default function Navigation() {
  const onClick = (channelId: string) => {
    console.log({ channelId });
  };

  const channels = [
    {
      id: 'testid',
      title: 'Test Channel',
      thumbnails: {
        default: 'default.png',
        high: 'high.png',
      },
    },
  ];

  return (
    <NavigationWrapper>
      <Logo />
      <Channels channels={channels} onClick={onClick} />
    </NavigationWrapper>
  );
}
