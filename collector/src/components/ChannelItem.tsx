import React from 'react';

import { ChannelButton, ChannelItemThumbnails } from './ChannelItem.style';

export interface ChannelItemProps {
  id: string;
  title: string;
  thumbnails: ChannelItemThumbnails;
  onClick?: (videoId: string) => void;
}

export default function ChannelItem({ id, title, thumbnails, onClick }: ChannelItemProps) {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <ChannelButton
      type="button"
      thumbnails={thumbnails}
      data-id={id}
      aria-label={title}
      onClick={handleClick}
    >
      <span>{title}</span>
    </ChannelButton>
  );
}
