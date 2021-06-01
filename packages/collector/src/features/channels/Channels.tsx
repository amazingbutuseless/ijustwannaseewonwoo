import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ChannelsList } from './Channels.style';

import ChannelItem from './ChannelItem';
import { fetchChannels, selectAllChannels } from './channelsSlice';

interface ChannelsProps {
  onClick: (channelId: string) => void;
}

export default function Channels({ onClick }: ChannelsProps): ReactElement {
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

  return (
    <ChannelsList>
      {['idle', 'pending'].includes(channelStatus) && <li>loading...</li>}

      {channelStatus === 'succeeded' &&
        channelItems.map((channel, idx: number) => (
          <ChannelItem key={`channel-${idx + 1}`} {...channel} onClick={onClick} />
        ))}
    </ChannelsList>
  );
}
