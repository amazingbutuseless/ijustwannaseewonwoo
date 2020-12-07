import React from 'react';
import styled from '@emotion/styled';

import ChannelItem, { ChannelItemProps } from '../../components/ChannelItem';

interface ChannelsProps {
  channels: Array<ChannelItemProps>;
  onClick: Function;
}

const ChannelsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export default function Channels({
  channels,
  onClick = (channelId: string): void => {},
}: ChannelsProps) {
  return (
    <ChannelsList>
      {channels.map((channel, idx) => (
        <li key={`channel-${idx + 1}`}>
          <ChannelItem {...channel} onClick={onClick} />
        </li>
      ))}
    </ChannelsList>
  );
}
