import React from 'react';

import { IVideoItemWithChannel } from '../../types';

import { VideoItemsWrapper } from './VideoList.style';

import VideoItem from './VideoItem';

interface VideoItemsProps {
  items: Array<IVideoItemWithChannel>;
  onClick: (videoId: string, title: string) => void;
}

export default function VideoItems({ items, onClick }: VideoItemsProps) {
  return (
    <VideoItemsWrapper>
      {items.map((video) => {
        const { videoId, title, thumbnail, publishedAt, channel } = video;

        return (
          <VideoItem
            key={videoId}
            videoId={videoId}
            title={title}
            thumbnail={thumbnail}
            publishedAt={publishedAt}
            channel={channel}
            onClick={onClick}
          />
        );
      })}
    </VideoItemsWrapper>
  );
}
