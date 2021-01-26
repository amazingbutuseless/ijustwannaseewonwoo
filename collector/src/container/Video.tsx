import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { VideoItemWrapper } from './Video.style';

import Header from './Header';
import { selectVideoById } from '../actions/videos';

export default function Video() {
  const { videoId } = useParams();

  const video = useSelector((state) => selectVideoById(state, videoId));

  return (
    <>
      <Header title={video.title} />
      <VideoItemWrapper>
        {!video && <div>비디오 없음</div>}
        {video && (
          <iframe
            src={`https://www.youtube.com./embed/${video.videoId}?autoplay=1`}
            frameBorder="0"
          />
        )}
      </VideoItemWrapper>
    </>
  );
}
