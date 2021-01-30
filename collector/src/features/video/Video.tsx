import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SceneTimecodeInterface } from '../../types';

import { selectVideoById } from '../videos/videosSlice';
import { fetchVideo } from './videoSlice';

import { VideoWrapper } from './Video.style';

import Header from '../../container/Header';
import VideoPlayer from '../../components/VideoPlayer';
import Scenes from '../../container/Scenes';

interface VideoRouterParams {
  videoId: string;
}

function Video() {
  const { videoId }: VideoRouterParams = useParams();

  const [time, updateTime] = useState({ start: 0, end: null });
  const [timeSource, setTimeSource] = useState('scene');

  const dispatch = useDispatch();

  const video = useSelector((state) => selectVideoById(state, videoId));

  useEffect(() => {
    if (!video) {
      dispatch(fetchVideo({ videoId }));
    } else {
      if (video.scenes.length > 0) {
        const { start, end } = video.scenes[0];
        updateTime({
          start,
          end,
        });
      }
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

export default Video;
