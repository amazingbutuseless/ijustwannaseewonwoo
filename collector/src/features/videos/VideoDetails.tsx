import { ipcRenderer, IpcRendererEvent } from 'electron';

import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SceneTimecodeInterface } from '../../types';

import { selectAllScenesForVideo, uploadSceneThumbnail } from '../scenes/scenesSlice';

import { VideoWrapper } from './VideoDetails.style';

import Header from '../../components/Header';
import VideoForWonwoo from './VideoForWonwoo';
import Scenes from '../scenes/Scenes';
import SceneAddForm from '../scenes/SceneAddForm';
import VideoPlayer from './VideoPlayer';

import { IFaceRecognitionResult } from '../../utils/face_recorgnizer';
import { upload } from '../../utils/image_uploader';

interface VideoRouterParams {
  videoId: string;
}

function VideoDetails(): ReactElement {
  const { videoId }: VideoRouterParams = useParams();
  const dispatch = useDispatch();

  let title, playlistId;

  if (typeof useLocation().state !== 'undefined') {
    const locationState = useLocation().state;
    title = locationState.title;
    playlistId = locationState.playlistId;
  }

  const player = useRef(null);
  const [time, updateTime] = useState({ start: -1, end: null });
  const [timeSource, setTimeSource] = useState('scene');
  const [activeSceneIdx, updateActiveSceneIdx] = useState(null);

  const [sceneAddFormVisible, setSceneAddFormVisible] = useState(false);
  const [enableSceneAddButton, setEnableSceneAddButton] = useState(false);

  const scenes = useSelector((state) => selectAllScenesForVideo(state, videoId));

  const onVideoDownloaded = (event: IpcRendererEvent, message: any) => {
    if (message.videoId !== videoId) return;

    setEnableSceneAddButton(message.rates >= 1);
  };

  const onFaceDetected = (event: IpcRendererEvent, message: any) => {
    const { videoId, start, thumbnail } = message;
    dispatch(uploadSceneThumbnail({ videoId, start, imageUrl: thumbnail }));

    Object.entries(message.results).forEach(([memberName, recognitions]) => {
      recognitions.forEach((recognition: IFaceRecognitionResult) => {
        const { name, videoId, timestamp, url } = recognition;
        const key = `recognized/${name}/${videoId}--${timestamp}.jpg`;
        upload(key, url);
      });
    });
  };

  useEffect(() => {
    ipcRenderer.send('video/download', { videoId });

    ipcRenderer.on('video/download', onVideoDownloaded);
    ipcRenderer.on('video/detectFaces', onFaceDetected);

    return () => {
      ipcRenderer.off('video/download', onVideoDownloaded);
      ipcRenderer.off('video/detectFaces', onFaceDetected);
    };
  }, [videoId]);

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

  const onScenesLoaded = () => {
    const scenesLoadedTimer = window.setInterval(() => {
      if (player) window.clearInterval(scenesLoadedTimer);

      if (scenes.length > 0) {
        setTimeSource('scene');
        updateActiveSceneIdx(0);
        const { start, end } = scenes[0];
        updateTime({ start, end });
      } else {
        if (scenes.length < 1) {
          updateTime({ start: 0, end: null });
          return;
        }
      }
    }, 500);
  };

  return (
    <>
      <Header title={title} />

      <VideoWrapper>
        <div style={{ position: 'relative' }}>
          <VideoPlayer videoId={videoId} timecode={time} onPaused={onPlayerPaused} ref={player} />
          <SceneAddForm
            visible={sceneAddFormVisible}
            videoId={videoId}
            playlistId={playlistId}
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
          onLoaded={onScenesLoaded}
          enableButton={enableSceneAddButton}
        />
      </VideoWrapper>
    </>
  );
}

export default VideoDetails;
