import React from 'react';

import { SceneListItemWrapper } from './SceneListItem.style';

export interface SceneTimecodeInterface {
  start: string;
  end: string;
}

export interface SceneInterface {
  thumbnails: string;
  start: string;
  end: string;
}

interface SceneListItemProps extends SceneInterface {
  onSceneClick: ({ start, end }: SceneTimecodeInterface) => void;
}

export default function SceneListItem({
  thumbnails,
  start,
  end,
  onSceneClick,
}: SceneListItemProps) {
  const onClick = () => {
    onSceneClick({ start, end });
  };

  return (
    <SceneListItemWrapper onClick={onClick}>
      <img src={thumbnails} alt="" />
      <strong>
        {start} ~ {end}
      </strong>
    </SceneListItemWrapper>
  );
}
