import React from 'react';

import { VideoItemWrapper, VideoItemThumbnail, VideoItemInfo } from './VideoItem.style';

interface VideoItemProps {
  videoId: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  channel: {
    thumbnails: {
      default: string;
    };
  };
  onClick: (videoId: string) => void;
}

export default function VideoItem({
  videoId,
  title,
  publishedAt,
  thumbnail,
  channel,
  onClick,
}: VideoItemProps) {
  const handleClick = () => {
    onClick(videoId);
  };

  return (
    <VideoItemWrapper onClick={handleClick}>
      <VideoItemThumbnail src={thumbnail.url} alt={title} />

      <VideoItemInfo>
        <strong>
          {title} <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </strong>
      </VideoItemInfo>
    </VideoItemWrapper>
  );
}
