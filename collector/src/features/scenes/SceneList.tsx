import React, { ReactElement, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchScenes, selectAllScenesForVideo } from './scenesSlice';

import { SceneTimecodeInterface, Video } from '../../types';

import { List, LoadingAnimation } from './SceneList.style';

import Item, { EmptyItem } from './SceneListItem';

interface SceneListProps extends Video {
  activeSceneIdx: number;
  onLoaded: () => void;
  onSceneClick: ({ start, end }: SceneTimecodeInterface) => void;
  onEmptyListClick: () => void;
  videoTitle?: string;
}

export default function SceneList({
  videoId,
  videoTitle,
  activeSceneIdx,
  onLoaded,
  onSceneClick,
  onEmptyListClick,
}: SceneListProps): ReactElement {
  const list = useRef(null);

  const dispatch = useAppDispatch();

  const scenes = useAppSelector((state) => selectAllScenesForVideo(state, videoId));
  const scenesStatus = useAppSelector((state) => state.scenes.status);

  useEffect(() => {
    dispatch(fetchScenes(videoId));
  }, [videoId]);

  useEffect(() => {
    if (scenesStatus === 'succeeded') {
      onLoaded();
    }
  }, [scenesStatus]);

  useEffect(() => {
    const scenes = list.current.querySelectorAll('li');
    if (scenes) {
      const scene = scenes.item(activeSceneIdx);
      if (scene) list.current.scrollLeft = scene.offsetLeft - 88;
    }
  }, [activeSceneIdx]);

  return (
    <List activeItemIdx={activeSceneIdx} ref={list}>
      {scenesStatus === 'pending' && <LoadingAnimation>{videoTitle}</LoadingAnimation>}
      {scenesStatus === 'succeeded' &&
        ((scenes.length > 0 &&
          scenes.map((scene, idx) => (
            <Item
              key={`scene-${idx + 1}`}
              {...scene}
              onSceneClick={onSceneClick}
              active={activeSceneIdx === idx}
            />
          ))) ||
          (scenes.length < 1 && <EmptyItem onClick={onEmptyListClick} />))}
    </List>
  );
}
