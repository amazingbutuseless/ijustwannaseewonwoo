import React from 'react';
import styled from '@emotion/styled';

interface ChannelItemThumbnails {
  default?: string;
  medium?: string;
  high?: string;
}

export interface ChannelItemProps {
  id: string;
  title: string;
  thumbnails: ChannelItemThumbnails;
  onClick?: Function;
}

interface ChannelItemButtonStyleProps {
  thumbnails: ChannelItemThumbnails;
}

const ChannelButton = styled.button`
  display: block;
  width: 6.4rem;
  height: 6.4rem;
  border: 0;
  border-radius: 12.8rem;
  background-image: url(${({ thumbnails }: ChannelItemButtonStyleProps) => thumbnails.default});
  background-size: cover;

  span {
    display: none;
  }
`;

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
