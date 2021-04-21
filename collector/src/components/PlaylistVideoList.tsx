import React from 'react';

import { IVideoItem, RegisteredVideo } from '../types';
import { VideoHelper } from '../VideoHelper';

import { PlaylistVideoListWrapper } from './PlaylistVideoList.style';

import VideoItem, { WithOnClickEventHandler } from './VideoItem';

export type ytVideos = Array<IVideoItem>;

export type registeredVideos = Array<RegisteredVideo>;

export interface PlaylistVideoListProps extends WithOnClickEventHandler {
  ytVideos: ytVideos;
  registeredVideos: registeredVideos;
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
