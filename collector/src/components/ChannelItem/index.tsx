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

  position: relative;

  width: 6.4rem;
  height: 6.4rem;

  border: 4px solid transparent;
  border-radius: 12.8rem;
  background-image: url(${({ thumbnails }: ChannelItemButtonStyleProps) => thumbnails.default});
  background-size: cover;
  box-sizing: border-box;

  cursor: pointer;

  span {
    display: none;
  }

  &:focus,
  &:hover {
    border-color: var(--liberty);
    outline: none;

    &:after {
      position: absolute;
      left: calc(100% + 6px);
      top: 50%;
      padding: 0.8rem;
      border-radius: 4px;
      background-color: var(--black-coffee);
      transform: translateY(-50%);
      color: #fff;
      content: attr(aria-label);
    }
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
