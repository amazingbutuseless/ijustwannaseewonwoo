import React, { ReactElement, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchScenes, selectAllScenesForVideo } from './scenesSlice';

import { SceneTimecodeInterface } from '../../types';

import { Wrapper, List, LoadingAnimation } from './SceneList.style';

import Item, { EmptyItem } from './SceneListItem';

interface SceneListProps {
  videoId: string;
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

  const dispatch = useDispatch();

  const scenes = useSelector((state) => selectAllScenesForVideo(state, videoId));
  const scenesStatus = useSelector((state) => state.scenes.status);

  useEffect(() => {
    const scenes = list.current.querySelectorAll('li');
    if (scenes) {
      const scene = scenes.item(activeSceneIdx);
      if (scene) list.current.scrollLeft = scene.offsetLeft - 88;
    }
  }, [activeSceneIdx]);

  useEffect(() => {
    if (scenesStatus === 'idle') {
      dispatch(fetchScenes(videoId));
    } else if (scenesStatus === 'succeeded') {
      onLoaded();
    }
  }, [videoId, scenesStatus]);

  return (
    <Wrapper>
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
    </Wrapper>
  );
}
