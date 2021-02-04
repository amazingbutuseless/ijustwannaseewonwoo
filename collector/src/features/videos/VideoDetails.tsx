import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SceneTimecodeInterface } from '../../types';

import { fetchVideo, selectVideoById } from './videosSlice';

import { VideoWrapper } from './VideoDetails.style';

import Header from '../../components/Header';
import VideoPlayer from '../../components/VideoPlayer';
import Scenes from '../scenes/Scenes';

interface VideoRouterParams {
  videoId: string;
}

function VideoDetails() {
  const { videoId }: VideoRouterParams = useParams();

  const [time, updateTime] = useState({ start: 0, end: null });
  const [timeSource, setTimeSource] = useState('scene');

  const dispatch = useDispatch();

  const video = useSelector((state) => selectVideoById(state, videoId));

  useEffect(() => {
    if (!video) {
      dispatch(fetchVideo(videoId));
    }
  }, [video, dispatch]);

  const playNextScene = () => {
    const currentSceneIndex = video.scenes.findIndex(
      (scene) => scene.start === time.start && scene.end === time.end
    );
    const nextSceneIndex = currentSceneIndex + 1;

    if (nextSceneIndex < video.scenes.length) {
      const { start, end } = video.scenes[nextSceneIndex];
      updateTime({ start, end });
    }
  };

  const playDurationAndStop = () => {
    console.log('play duration');
  };

  const onTimecodeSet = (timecode: SceneTimecodeInterface) => {
    setTimeSource('addScene');
    updateTime(timecode);
  };

  const onSceneClick = (timecode: SceneTimecodeInterface) => {
    setTimeSource('scene');
    updateTime(timecode);
  };

  const replay = (seekToFunc) => {
    seekToFunc(timecode.start);
  };

  return (
    <>
      <Header title={video ? video.title : ''} />
      <VideoWrapper>
        {video && (
          <>
            <VideoPlayer
              videoId={videoId}
              timecode={time}
              onPaused={timeSource === 'scene' ? playNextScene : playDurationAndStop}
              replay={replay}
            />

            <Scenes
              videoId={videoId}
              publishedAt={video.publishedAt}
              onTimecodeSet={onTimecodeSet}
              onSceneClick={onSceneClick}
            />
          </>
        )}
      </VideoWrapper>
    </>
  );
}

export default VideoDetails;
