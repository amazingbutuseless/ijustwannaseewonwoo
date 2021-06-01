import React from 'react';

import { IPlaylist } from '../types';

import { PlaylistListWrapper } from './PlaylistList.style';
import PlaylistListItem, { WithClick } from './PlaylistListItem';

export interface PlaylistListProps extends WithClick {
  playlists: Array<IPlaylist>;
  activeId: string;
}

export default function PlaylistList({ playlists, activeId, onClick }: PlaylistListProps) {
  return (
    <PlaylistListWrapper>
      {playlists.map((playlist) => (
        <PlaylistListItem
          key={playlist.id}
          playlist={playlist}
          active={activeId === playlist.id}
          onClick={onClick}
        />
      ))}
    </PlaylistListWrapper>
  );
}
