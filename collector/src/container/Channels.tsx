import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';

import ChannelItem, { ChannelItemProps } from '../components/ChannelItem';
import { fetchChannels, selectAllChannels } from '../actions/channels';

interface ChannelsProps {
  onClick: Function;
}

const ChannelsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export default function Channels({ onClick = (channelId: string): void => {} }: ChannelsProps) {
  const dispatch = useDispatch();

  const channelItems = useSelector(selectAllChannels);
  const channelStatus = useSelector((state) => {
    return state.channels.status;
  });
  const error = useSelector((state) => state.channels.error);

  useEffect(() => {
    if (channelStatus === 'idle') {
      const channels = fetchChannels();
      dispatch(channels);
    }
  }, [channelStatus, dispatch]);

  const ChannelItems = () => {
    if (['idle', 'pending'].includes(channelStatus)) {
      return <li>loading...</li>;
    }

    if (channelStatus === 'succeeded') {
      return (
        <>
          {channelItems.map((channel: ChannelItemProps, idx: number) => {
            return (
              <li key={`channel-${idx + 1}`}>
                <ChannelItem {...channel} onClick={onClick} />
              </li>
            );
          })}
        </>
      );
    }
  };

  return (
    <ChannelsList>
      <ChannelItems />
    </ChannelsList>
  );
}
