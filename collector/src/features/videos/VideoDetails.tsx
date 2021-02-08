import { ipcRenderer } from 'electron';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SceneTimecodeInterface } from '../../types';

import { fetchVideo, selectVideoById } from './videosSlice';
import { selectAllScenesForVideo } from '../scenes/scenesSlice';

import { VideoWrapper } from './VideoDetails.style';

import Header from '../../components/Header';
import VideoForWonwoo from './VideoForWonwoo';
import Scenes from '../scenes/Scenes';
import SceneAddForm from '../scenes/SceneAddForm';
import VideoPlayer from '../../components/VideoPlayer';

interface VideoRouterParams {
  videoId: string;
}

function VideoDetails() {
  const { videoId }: VideoRouterParams = useParams();

  const player = useRef(null);
  const [time, updateTime] = useState({ start: -1, end: null });
  const [timeSource, setTimeSource] = useState('scene');
  const [activeSceneIdx, updateActiveSceneIdx] = useState(null);

  const [sceneAddFormVisible, setSceneAddFormVisible] = useState(false);

  const dispatch = useDispatch();

  const video = useSelector((state) => selectVideoById(state, videoId));
  const scenes = useSelector((state) => selectAllScenesForVideo(state, videoId));

  useEffect(() => {
    dispatch(fetchVideo(videoId));
    ipcRenderer.send('video', { action: 'download', videoId });

    ipcRenderer.on(`videoDetails/${videoId}`, (event, progress) => {
      console.log(progress);
    });
  }, [videoId]);

  useEffect(() => {
    if (player) {
      if (scenes.length < 1) {
        updateTime({ start: 0, end: null });
        return;
      }

      setTimeSource('scene');
      updateActiveSceneIdx(0);
      const { start, end } = scenes[0];
      updateTime({ start, end });
    }
  }, [player]);

  const getSceneIndex = ({ start, end }) => {
    return scenes.findIndex((scene) => scene.start === start && scene.end === end);
  };

  const playNextScene = () => {
    const nextSceneIndex = activeSceneIdx + 1;

    if (nextSceneIndex < scenes.length) {
      updateActiveSceneIdx(nextSceneIndex);

      const { start, end } = scenes[nextSceneIndex];
      updateTime({ start, end });
    }
  };

  const onPlayerPaused = () => {
    if (timeSource === 'scene') {
      playNextScene();
    }
  };

  const onSceneClick = (timecode: SceneTimecodeInterface) => {
    const sceneIndex = getSceneIndex(timecode);

    setTimeSource('scene');
    updateActiveSceneIdx(sceneIndex);
    updateTime(timecode);
    player.current.seekTo(timecode.start);
  };

  const onAddSceneButtonClick = () => {
    setSceneAddFormVisible(true);
  };

  const onSceneAdded = () => {
    setSceneAddFormVisible(false);
  };

  const onTimecodeSet = (timecode: SceneTimecodeInterface) => {
    setTimeSource('addScene');
    updateTime(timecode);
    player.current.seekTo(timecode.start);
  };

  const onSceneAddFormCloseButtonClick = () => {
    setSceneAddFormVisible(false);
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
                onPaused={onPlayerPaused}
                ref={player}
              />
              <SceneAddForm
                visible={sceneAddFormVisible}
                videoId={videoId}
                onTimecodeSet={onTimecodeSet}
                onSceneAdded={onSceneAdded}
                onCloseButtonClick={onSceneAddFormCloseButtonClick}
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
