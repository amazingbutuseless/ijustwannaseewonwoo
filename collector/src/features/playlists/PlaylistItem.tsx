import React from 'react';
import { useHistory } from 'react-router';

import { IPlaylist } from '../../types';

import { PlaylistItemWrapper, PlaylistTitle, ChannelInfo } from './PlaylistItem.style';

export default function PlaylistItem({ title, id, channel }: IPlaylist) {
  const history = useHistory();

  const onClick = () => {
    history.push(`/playlist/${id}`);
  };

  return (
    <PlaylistItemWrapper onClick={onClick}>
      <PlaylistTitle>{title}</PlaylistTitle>

      <ChannelInfo>
        <img src={channel.thumbnails.medium} alt={channel.title} />
        {channel.title}
      </ChannelInfo>
    </PlaylistItemWrapper>
  );
}
