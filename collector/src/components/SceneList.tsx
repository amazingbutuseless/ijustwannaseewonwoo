import React, { ReactElement } from 'react';

import { SceneItemInterface, SceneTimecodeInterface } from '../types';

import { List } from './SceneList.style';

import Item, { EmptyItem, WithRegisterRef } from './SceneListItem';

export interface SceneListProps extends WithRegisterRef {
  scenes: Array<SceneItemInterface>;
  onSceneClick: ({ start, end }: SceneTimecodeInterface) => void;
  activeIdx: number;
}

export default function SceneList({
  scenes,
  onSceneClick,
  registerRef,
  activeIdx,
}: SceneListProps): ReactElement {
  return (
    <List>
      {scenes.length > 0 &&
        scenes.map((scene, idx) => (
          <Item
            key={scene.id}
            {...scene}
            onSceneClick={onSceneClick}
            active={activeIdx === idx}
            registerRef={registerRef}
          />
        ))}
      {scenes.length < 1 && <EmptyItem />}
    </List>
  );
}
