import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchVideo, selectVideoById } from '../actions/video';

import { VideoWrapper, SceneWrapper, SceneList } from './Video.style';

import Header from './Header';
import VideoPlayer from '../components/VideoPlayer';
import Scenes from './Scenes';

export default function Video() {
  const [time, updateTime] = useState({ start: '', end: '' });

  const dispatch = useDispatch();
  const { videoId } = useParams();

  const videoStatus = useSelector((state) => {
    return state.video.status;
  });
  const error = useSelector((state) => state.video.error);

  const video = useSelector((state) => selectVideoById(state, videoId));

  useEffect(() => {
    if (videoStatus === 'idle') {
      dispatch(fetchVideo({ videoId }));
    }
  }, [videoStatus, dispatch]);

  const onSceneClick = (timecode) => {
    console.log({ timecode });
    updateTime(timecode);
  };

  return (
    <>
      <Header title={videoStatus === 'succeeded' ? video.title : ''} />
      <VideoWrapper>
        {videoStatus === 'succeeded' && (
          <>
            <VideoPlayer videoId={video.videoId} {...time} />

            <Scenes videoId={videoId} scenes={video.scenes} onTimecodeSet={onSceneClick} />
          </>
        )}
      </VideoWrapper>
    </>
  );
}
