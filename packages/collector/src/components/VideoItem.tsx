import React from 'react';

import { Video, WithPublishedAt } from '../types';
import { VideoItemWrapper, VideoItemThumbnail, VideoItemInfo, ForWonwoo } from './VideoItem.style';

export interface WithOnClickEventHandler {
  onClick: (videoId: string, title: string) => void;
}

interface VideoItemProps extends Video, WithPublishedAt, WithOnClickEventHandler {
  title: string;
  thumbnail: string;
  forWonwoo: boolean;
}

export default function VideoItem({
  videoId,
  title,
  publishedAt,
  thumbnail,
  onClick,
  forWonwoo,
}: VideoItemProps) {
  const handleClick = () => {
    onClick(videoId, title);
  };

  return (
    <VideoItemWrapper onClick={handleClick}>
      <VideoItemThumbnail src={thumbnail} alt={title} />

      {forWonwoo && <ForWonwoo />}

      <VideoItemInfo>
        <strong>
          {title} <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </strong>
      </VideoItemInfo>
    </VideoItemWrapper>
  );
}
