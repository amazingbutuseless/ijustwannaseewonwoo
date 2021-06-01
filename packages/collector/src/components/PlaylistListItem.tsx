import React from 'react';

import { IPlaylist } from '../types';

import {
  PlaylistListItemTitleProps,
  PlaylistListItemWrapper,
  ChannelInfo,
  Title,
} from './PlaylistListItem.style';

export interface WithClick {
  onClick: (playlistId: string) => void;
}

export interface PlaylistListItemProps extends PlaylistListItemTitleProps, WithClick {
  playlist: IPlaylist;
}

export default function PlaylistListItem({ playlist, active, onClick }: PlaylistListItemProps) {
  const handleClick = () => {
    onClick(playlist.id);
  };

  const { channel } = playlist;

  return (
    <PlaylistListItemWrapper onClick={handleClick}>
      <Title active={active}>{playlist.title}</Title>

      <ChannelInfo>
        <img src={channel.thumbnails.medium} alt={channel.title} />
        {channel.title}
      </ChannelInfo>
    </PlaylistListItemWrapper>
  );
}
