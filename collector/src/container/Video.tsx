import React from 'react';
import { useParams } from 'react-router-dom';

import { VideoItemWrapper } from './Video.style';

export default function Video() {
  const { videoId } = useParams();

  return (
    <>
      <VideoItemWrapper>
        <iframe src={`https://www.youtube.com./embed/${videoId}?autoplay=1`} frameBorder="0" />
      </VideoItemWrapper>
    </>
  );
}
