import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchVideo, selectVideoById } from '../actions/video';

import { VideoWrapper } from './Video.style';

import Header from './Header';
import VideoPlayer from '../components/VideoPlayer';
import Scenes from './Scenes';
import { SceneTimecodeInterface } from '../components/SceneListItem';

export default function Video() {
  const { videoId } = useParams();

  const [time, updateTime] = useState({ start: 0, end: null });
  const [onPaused, setOnPausedCallback] = useState(() => {});

  const dispatch = useDispatch();

  const video = useSelector((state) => selectVideoById(state, videoId));

  useEffect(() => {
    if (!video) {
      dispatch(fetchVideo({ videoId }));
    }
  }, [video, dispatch]);

  const playScenes = () => {};

  const playDurationAndStop = () => {};

  const onTimecodeSet = (timecode: SceneTimecodeInterface) => {
    setOnPausedCallback(playDurationAndStop);
    updateTime(timecode);
  };

  const onSceneClick = (timecode: SceneTimecodeInterface) => {
    setOnPausedCallback(playScenes);
    updateTime(timecode);
  };

  return (
    <>
      <Header title={video ? video.title : ''} />
      <VideoWrapper>
        {video && (
          <>
            <VideoPlayer videoId={videoId} timecode={time} onPaused={onPaused} />

            <Scenes
              videoId={videoId}
              scenes={video.scenes}
              onTimecodeSet={onTimecodeSet}
              onSceneClick={onSceneClick}
            />
          </>
        )}
      </VideoWrapper>
    </>
  );
}
