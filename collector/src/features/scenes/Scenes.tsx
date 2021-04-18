import React, { ReactElement } from 'react';
import { useLocation } from 'react-router';

import { SceneTimecodeInterface, Video } from '../../types';

import { SceneWrapper } from './Scenes.style';

import AddSceneButton from '../../components/AddSceneButton';
import SceneList from './SceneList';

interface SceneProps extends Video {
  onSceneClick: ({ start, end }: SceneTimecodeInterface) => void;
  onAddSceneButtonClick: () => void;
  onLoaded: () => void;
  activeSceneIdx?: number;
  enableButton: boolean;
}

export default function Scenes({
  videoId,
  onSceneClick,
  onAddSceneButtonClick,
  onLoaded,
  activeSceneIdx = -1,
  enableButton = false,
}: SceneProps): ReactElement {
  let videoTitle = '';
  if (typeof useLocation().state !== 'undefined') {
    videoTitle = useLocation().state.title;
  }

  return (
    <SceneWrapper>
      <SceneList
        videoId={videoId}
        videoTitle={videoTitle}
        activeSceneIdx={activeSceneIdx}
        onLoaded={onLoaded}
        onSceneClick={onSceneClick}
        onEmptyListClick={onAddSceneButtonClick}
      />

      <AddSceneButton onClick={onAddSceneButtonClick} enable={enableButton} />
    </SceneWrapper>
  );
}
