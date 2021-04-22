import React from 'react';

import { YtVideos, RegisteredVideos } from '../types';
import { VideoHelper } from '../app/video_helper';

import { PlaylistVideoListWrapper } from './PlaylistVideoList.style';

import VideoItem, { WithOnClickEventHandler } from './VideoItem';

export interface PlaylistVideoListProps extends WithOnClickEventHandler {
  ytVideos: YtVideos;
  registeredVideos: RegisteredVideos;
}

export default function PlaylistVideoList({
  ytVideos,
  registeredVideos,
  onClick,
}: PlaylistVideoListProps) {
  const videosForWonwoo = VideoHelper.getVideosForWonwoo(ytVideos, registeredVideos);

  return (
    <PlaylistVideoListWrapper>
      {ytVideos.map((video) => {
        const { videoId, title, publishedAt, thumbnail } = video;
        const forWonwoo = videosForWonwoo.includes(video.videoId);

        return (
          <VideoItem
            key={video.videoId}
            videoId={videoId}
            title={title}
            thumbnail={thumbnail.url}
            publishedAt={publishedAt}
            forWonwoo={forWonwoo}
            onClick={onClick}
          />
        );
      })}
    </PlaylistVideoListWrapper>
  );
}
