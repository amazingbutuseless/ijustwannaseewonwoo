import React from 'react';
import styled from '@emotion/styled';

import Logo from './components/Logo';

const ChannelsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

function ChannelItem({ title }) {
  return (
    <li>
      <button type="button">{title}</button>
    </li>
  );
}

function Channels({ channels }) {
  return (
    <ChannelsList>
      {channels.map((channel, idx) => (
        <ChannelItem key={`channel-${idx + 1}`} {...channel} />
      ))}
    </ChannelsList>
  );
}

const NavigationWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem;
  width: 6rem;
  height: 100vh;
  border-right: 1px solid #efefef;
  box-sizing: border-box;
`;

function Navigation() {
  return (
    <NavigationWrapper>
      <Logo />
      <Channels channels={[]} />
    </NavigationWrapper>
  );
}

export default function App() {
  return (
    <>
      <Navigation />
    </>
  );
}
