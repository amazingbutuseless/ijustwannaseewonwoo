import React from 'react';

import { IPlaylist } from '../types';

import PlaylistVideoList from './PlaylistVideoList';
import MoreVideosButton from './MoreVideosButton';

export interface PlaylistVideosContainerProps {
  playlist: IPlaylist;
  onVideoClick: (videoId: string, title: string) => void;
  onMoreVideosButtonClick: () => void;
}

export default function PlaylistVideosContainer({
  playlist,
  onVideoClick,
  onMoreVideosButtonClick,
}: PlaylistVideosContainerProps) {
  return (
    <>
      <PlaylistVideoList
        ytVideos={playlist.ytVideos}
        registeredVideos={playlist.videos}
        onClick={onVideoClick}
      />

      <MoreVideosButton
        current={playlist.ytVideos.length || 0}
        total={playlist.numOfVideos || 0}
        onClick={onMoreVideosButtonClick}
      />
    </>
  );
}
