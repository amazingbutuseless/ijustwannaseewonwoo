import React, { ReactElement } from 'react';

import { SceneItemInterface, SceneTimecodeInterface } from '../types';

import { List } from './SceneList.style';

import Item, { EmptyItem } from './SceneListItem';

export interface SceneListProps {
  scenes: Array<SceneItemInterface>;
  activeSceneIdx: number;
  onSceneClick: ({ start, end }: SceneTimecodeInterface) => void;
}

export default function SceneList({
  scenes,
  activeSceneIdx,
  onSceneClick,
}: SceneListProps): ReactElement {
  return (
    <List activeItemIdx={activeSceneIdx}>
      {scenes.length > 0 &&
        scenes.map((scene, idx) => (
          <Item
            key={scene.id}
            {...scene}
            onSceneClick={onSceneClick}
            active={activeSceneIdx === idx}
          />
        ))}
      {scenes.length < 1 && <EmptyItem />}
    </List>
  );
}
