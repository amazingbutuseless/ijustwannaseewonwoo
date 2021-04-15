import React from 'react';

import { Video, WithPublishedAt } from '../../types';
import { VideoItemWrapper, VideoItemThumbnail, VideoItemInfo, ForWonwoo } from './VideoItem.style';

interface VideoItemProps extends Video, WithPublishedAt {
  title: string;
  thumbnail: string;
  onClick: (videoId: string, title: string) => void;
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
      <VideoItemThumbnail src={thumbnail.url} alt={title} />

      {forWonwoo && <ForWonwoo />}

      <VideoItemInfo>
        <strong>
          {title} <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </strong>
      </VideoItemInfo>
    </VideoItemWrapper>
  );
}
