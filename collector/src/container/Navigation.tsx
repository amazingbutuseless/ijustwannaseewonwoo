import React from 'react';
import { useHistory } from 'react-router-dom';

import { NavigationWrapper } from './Navigation.style';

import Channels from './Channels';

export default function Navigation() {
  const history = useHistory();

  const onClick = (channelId: string) => {
    history.push(`/channel/${channelId}`);
  };

  return (
    <NavigationWrapper>
      <Channels onClick={onClick} />
    </NavigationWrapper>
  );
}
