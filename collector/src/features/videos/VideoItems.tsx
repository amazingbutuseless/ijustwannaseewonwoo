import React from 'react';

import { IVideoItemWithChannel, RegisteredVideo } from '../../types';

import { VideoItemsWrapper } from './VideoList.style';

import VideoItem, { WithOnClickEventHandler } from './VideoItem';

interface VideoItemsProps extends WithOnClickEventHandler {
  items: Array<IVideoItemWithChannel>;
  sceneRegisteredVideos?: Array<RegisteredVideo>;
}

export default function VideoItems({
  items,
  onClick,
  sceneRegisteredVideos = [],
}: VideoItemsProps) {
  const findRegisteredVideo = (videoId: string): RegisteredVideo => {
    return sceneRegisteredVideos.find((video) => video.videoId === videoId);
  };

  const haveScenesRegistered = (registeredVideo: RegisteredVideo) => {
    return typeof registeredVideo !== 'undefined';
  };

  const doesWonwooNotAppear = (registeredVideo: RegisteredVideo) => {
    return registeredVideo.noAppears > 0;
  };

  return (
    <VideoItemsWrapper>
      {items.map((video) => {
        const { videoId, title, thumbnail, publishedAt } = video;

        const registered = findRegisteredVideo(videoId);

        return (
          <VideoItem
            key={videoId}
            videoId={videoId}
            title={title}
            thumbnail={thumbnail.url}
            publishedAt={publishedAt}
            forWonwoo={haveScenesRegistered(registered) && !doesWonwooNotAppear(registered)}
            onClick={onClick}
          />
        );
      })}
    </VideoItemsWrapper>
  );
}
