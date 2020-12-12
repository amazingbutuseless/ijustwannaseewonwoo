import React from 'react';
import styled from '@emotion/styled';

interface VideoItemProps {
  videoId: string;
  title: string;
  publishedAt: string;
  thumbnail: {
    url: string;
  };
  channel: {
    thumbnails: {
      default: string;
    };
  };
  onClick: Funtion;
}

const VideoItemWrapper = styled.div`
  position: relative;
  margin-bottom: 4rem;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  div {
    display: flex;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.75);

    strong {
      font-size: 1.4rem;
      color: #fff;
      line-height: 1.3;

      span {
        display: block;
        font-size: 1rem;
        color: #ccc;
      }
    }

    img {
      margin-right: 0.8rem;
      width: 3.6rem;
      height: 3.6rem;
      border-radius: 7.2rem;
    }
  }

  &:hover {
    box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.5);
  }

  @media screen and (min-width: 1024px) {
    max-width: calc(100% / 3 - 3.6rem);
  }
`;

export default function VideoItem({
  videoId,
  title,
  publishedAt,
  thumbnail,
  channel,
  onClick,
}: VideoItemProps) {
  const handleClick = (e) => {
    onClick(videoId);
  };

  return (
    <VideoItemWrapper onClick={handleClick}>
      <img src={thumbnail.url} alt="" />

      <div>
        <img src={channel.thumbnails.default} alt="" />
        <strong>
          {title} <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </strong>
      </div>
    </VideoItemWrapper>
  );
}
