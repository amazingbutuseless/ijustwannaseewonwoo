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

      <MoreVideosButton onClick={onMoreVideosButtonClick}>
        <>
          {playlist.numOfVideos > 0 && `${playlist.ytVideos.length} / ${playlist.numOfVideos}`}
          {playlist.numOfVideos < 1 && 'Loading...'}
        </>
      </MoreVideosButton>
    </>
  );
}
