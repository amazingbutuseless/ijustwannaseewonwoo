import { ipcRenderer, IpcRendererEvent } from 'electron';

import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { SceneTimecodeInterface } from '../../types';

import { selectAllScenesForVideo, fetchScenes, addScene } from '../scenes/scenesSlice';
import { selectVideoById, registerVideo } from './videosSlice';

import { VideoWrapper, VideoDownloadingMessage, ScenesWrapper } from './VideoDetails.style';

import { PlayTypeContext } from '../../components/PlayTypeSwitcher';
import Breadcrumb, { LocationDepths } from '../../components/Breadcrumb';
import SceneAddForm from '../../components/SceneAddForm';
import SceneList from '../../components/SceneList';
import VideoPlayer from '../../components/VideoPlayer';
import LoadingAnimation from '../../components/LoadingAnimation';

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
  const { playlistId, depths } = useLocation().state as VideoLocationStates;

  const player = useRef(null);
  const [time, updateTime] = useState({ start: -1, end: null });
  const [timeSource, setTimeSource] = useState('scene');
  const [activeSceneIdx, updateActiveSceneIdx] = useState(null);
  const [isLoading, updateLoading] = useState(true);

  const [enableSceneAddButton, setEnableSceneAddButton] = useState(false);

  const playType = useContext(PlayTypeContext);

  const video = useAppSelector((state) => selectVideoById(state, videoId));
  const scenes = useAppSelector((state) => selectAllScenesForVideo(state, videoId));
  const scenesStatus = useAppSelector((state) => state.scenes.status);

  const sceneContainer = useRef(null);
  const sceneRefs = useRef<Array<HTMLLIElement>>([]);

  const registerSceneRef = (elm: HTMLLIElement) => {
    // sceneRefs.current.push(elm);
  };

  useEffect(() => {
    if (sceneContainer.current && sceneRefs.current[activeSceneIdx]) {
      sceneContainer.current.scrollTop = sceneRefs.current[activeSceneIdx].offsetTop - 62;
    }
  }, [activeSceneIdx]);

  const onVideoDownloaded = (event: IpcRendererEvent, message: any) => {
    if (message.videoId !== videoId) return;

    setEnableSceneAddButton(message.rates >= 1);
  };

  useEffect(() => {
    dispatch(fetchScenes(videoId));

    ipcRenderer.send('video/download', { videoId });
    ipcRenderer.on('video/download', onVideoDownloaded);

    return () => {
      ipcRenderer.off('video/download', onVideoDownloaded);
    };
  }, [videoId]);

  useEffect(() => {
    if (scenesStatus === 'succeeded') {
      updateLoading(false);

      if (playType.playScenes && scenes.length > 0) {
        setTimeSource('scene');
        updateActiveSceneIdx(0);
        const { start, end } = scenes[0];
        updateTime({ start, end });
        return;
      }

      updateTime({ start: 0, end: null });
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
    if (playType.playScenes && timeSource === 'scene') {
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

  const onAddFormSumit = async ({ start, end }: SceneTimecodeInterface, resetForm: () => void) => {
    if (typeof video === 'undefined') {
      await dispatch(registerVideo({ videoId, playlistId }));
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
              장면 등록을 할 수 있도록 준비중입니다.
            </VideoDownloadingMessage>
          )}
          {enableSceneAddButton && (
            <SceneAddForm onTimecodeSet={onTimecodeSet} onSubmit={onAddFormSumit} />
          )}
        </div>

        <ScenesWrapper ref={sceneContainer}>
          {scenesStatus === 'succeeded' && (
            <SceneList
              scenes={scenes}
              onSceneClick={onSceneClick}
              registerRef={registerSceneRef}
              activeIdx={activeSceneIdx}
            />
          )}
        </ScenesWrapper>
      </VideoWrapper>

      {isLoading && <LoadingAnimation />}
    </>
  );
}

export default VideoDetails;
