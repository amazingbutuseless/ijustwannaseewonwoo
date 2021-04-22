import { ipcRenderer, IpcRendererEvent } from 'electron';

import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { SceneTimecodeInterface } from '../../types';

import { IFaceRecognitionResult } from '../../app/face_recorgnizer';
import { upload } from '../../app/image_uploader';

import {
  selectAllScenesForVideo,
  fetchScenes,
  addScene,
  uploadSceneThumbnail,
} from '../scenes/scenesSlice';
import { selectVideoById, registerVideo } from './videosSlice';

import { VideoWrapper, VideoDownloadingMessage } from './VideoDetails.style';

import Breadcrumb, { LocationDepths } from '../../components/Breadcrumb';
import SceneAddForm from '../../components/SceneAddForm';
import SceneList from '../../components/SceneList';
import VideoPlayer from '../../components/VideoPlayer';

interface VideoRouterParams {
  videoId: string;
}

interface VideoLocationStates extends LocationDepths {
  title: string;
  playlistId?: string;
}

function VideoDetails(): ReactElement {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { videoId }: VideoRouterParams = useParams();
  const { title, playlistId, depths } = useLocation().state as VideoLocationStates;

  const player = useRef(null);
  const [time, updateTime] = useState({ start: -1, end: null });
  const [timeSource, setTimeSource] = useState('scene');
  const [activeSceneIdx, updateActiveSceneIdx] = useState(null);

  const [enableSceneAddButton, setEnableSceneAddButton] = useState(false);

  const video = useAppSelector((state) => selectVideoById(state, videoId));
  const scenes = useAppSelector((state) => selectAllScenesForVideo(state, videoId));
  const scenesStatus = useAppSelector((state) => state.scenes.status);

  const onVideoDownloaded = (event: IpcRendererEvent, message: any) => {
    if (message.videoId !== videoId) return;

    setEnableSceneAddButton(message.rates >= 1);
  };

  const onFaceDetected = (event: IpcRendererEvent, message: any) => {
    const { videoId, start, thumbnail } = message;
    dispatch(uploadSceneThumbnail({ videoId, start, imageUrl: thumbnail }));

    Object.entries(message.results).forEach(([_, recognitions]) => {
      recognitions.forEach((recognition: IFaceRecognitionResult) => {
        const { name, videoId, timestamp, url } = recognition;
        const key = `recognized/${name}/${videoId}--${timestamp}.jpg`;
        upload(key, url);
      });
    });
  };

  useEffect(() => {
    dispatch(fetchScenes(videoId));

    ipcRenderer.send('video/download', { videoId });

    ipcRenderer.on('video/download', onVideoDownloaded);
    ipcRenderer.on('video/detectFaces', onFaceDetected);

    return () => {
      ipcRenderer.off('video/download', onVideoDownloaded);
      ipcRenderer.off('video/detectFaces', onFaceDetected);
    };
  }, [videoId]);

  useEffect(() => {
    if (scenesStatus === 'succeeded') {
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
    }
  }, [scenesStatus]);

  const getSceneIndex = ({ start, end }: SceneTimecodeInterface) => {
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

  const onTimecodeSet = (timecode: SceneTimecodeInterface) => {
    setTimeSource('addScene');
    updateTime(timecode);
    player.current.seekTo(timecode.start);
  };

  const onBreadcrumbItemClick = (path: string) => {
    history.push(path);
  };

  const onAddFormSumit = ({ start, end }, resetForm) => {
    if (!video) {
      dispatch(registerVideo({ videoId, playlistId }));
    }

    dispatch(addScene({ videoId, start, end }));
    ipcRenderer.send('from-main-to-worker', { action: 'prepare', videoId, start, end });

    resetForm();
  };

  return (
    <>
      <Breadcrumb depths={depths} onClick={onBreadcrumbItemClick} />

      <VideoWrapper>
        <div style={{ width: 'calc(100% - 18.4rem)' }}>
          <VideoPlayer videoId={videoId} timecode={time} onPaused={onPlayerPaused} ref={player} />

          {!enableSceneAddButton && (
            <VideoDownloadingMessage>
              😼 장면 등록을 위해서 비디오를 다운로드 받고 있습니다.
            </VideoDownloadingMessage>
          )}
          {enableSceneAddButton && (
            <SceneAddForm onTimecodeSet={onTimecodeSet} onSubmit={onAddFormSumit} />
          )}
        </div>

        <div
          style={{
            width: '18.4rem',
            height: 'calc(100vh - var(--titleBarHeight))',
            overflow: 'auto',
          }}
        >
          <SceneList scenes={scenes} activeSceneIdx={activeSceneIdx} onSceneClick={onSceneClick} />
        </div>
      </VideoWrapper>
    </>
  );
}

export default VideoDetails;
