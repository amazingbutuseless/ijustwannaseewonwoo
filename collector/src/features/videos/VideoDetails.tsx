import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SceneTimecodeInterface } from '../../types';

import { fetchVideo, selectVideoById } from './videosSlice';
import { selectAllScenesForVideo } from '../scenes/scenesSlice';

import { VideoWrapper } from './VideoDetails.style';

import Header from '../../components/Header';
import VideoPlayer from '../../components/VideoPlayer';
import VideoForWonwoo from './VideoForWonwoo';
import Scenes from '../scenes/Scenes';
import SceneAddForm from '../scenes/SceneAddForm';

interface VideoRouterParams {
  videoId: string;
}

function VideoDetails() {
  const { videoId }: VideoRouterParams = useParams();

  const [time, updateTime] = useState({ start: 0, end: null });
  const [timeSource, setTimeSource] = useState('scene');
  const [activeSceneIdx, updateActiveSceneIdx] = useState(-1);

  const [sceneAddFormVisible, setSceneAddFormVisible] = useState(false);

  const dispatch = useDispatch();

  const video = useSelector((state) => selectVideoById(state, videoId));

  const scenes = useSelector((state) => selectAllScenesForVideo(state, videoId));
  const scenesStatus = useSelector((state) => state.scenes.status);

  useEffect(() => {
    dispatch(fetchVideo(videoId));
  }, [videoId]);

  useEffect(() => {
    if (scenesStatus === 'succeeded' && scenes.length > 0) {
      setTimeSource('scene');

      const { start, end } = scenes[0];
      updateTime({ start, end });
    }
  }, [scenesStatus]);

  const getSceneIndex = ({ start, end }) => {
    return scenes.findIndex((scene) => scene.start === start && scene.end === end);
  };

  const playNextScene = () => {
    const currentSceneIndex = getSceneIndex({ start: time.start, end: time.end });
    const nextSceneIndex = currentSceneIndex + 1;

    if (nextSceneIndex < scenes.length) {
      updateActiveSceneIdx(nextSceneIndex);
      const { start, end } = scenes[nextSceneIndex];
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
    const { start, end } = timecode;
    const sceneIndex = getSceneIndex({ start, end });
    updateActiveSceneIdx(sceneIndex);

    setTimeSource('scene');
    updateTime(timecode);
  };

  const onAddSceneButtonClick = () => {
    setSceneAddFormVisible(true);
  };

  return (
    <>
      <Header title={video ? video.title : ''} />
      <VideoWrapper>
        {video && (
          <>
            <div style={{ position: 'relative' }}>
              <VideoPlayer
                videoId={videoId}
                timecode={time}
                onPaused={timeSource === 'scene' ? playNextScene : playDurationAndStop}
              />
              <SceneAddForm
                visible={sceneAddFormVisible}
                videoId={videoId}
                onTimecodeSet={onTimecodeSet}
              />
            </div>

            <Scenes
              videoId={videoId}
              onSceneClick={onSceneClick}
              onAddSceneButtonClick={onAddSceneButtonClick}
              activeSceneIdx={activeSceneIdx}
            />

            <VideoForWonwoo />
          </>
        )}
      </VideoWrapper>
    </>
  );
}

export default VideoDetails;
