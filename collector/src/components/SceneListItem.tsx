import React from 'react';

import { SceneListItemWrapper } from './SceneListItem.style';

export interface SceneTimecodeInterface {
  start: number;
  end: number;
}

export interface SceneInterface {
  thumbnails: string;
  start: number;
  end: number;
}

interface SceneListItemProps extends SceneInterface {
  onSceneClick: ({ start, end }: SceneTimecodeInterface) => void;
  active?: boolean;
}

export default function SceneListItem({
  thumbnails,
  start,
  end,
  onSceneClick,
  active = false,
}: SceneListItemProps) {
  const onClick = () => {
    onSceneClick({ start, end });
  };

  const startTimecode = `${Math.floor(start / 60)}:${start % 60}`;
  const endTimecode = `${Math.floor(end / 60)}:${end % 60}`;
  const durationMin = Math.floor((end - start) / 60);
  const durationSec = (end - start) % 60;
  const duration = `${durationMin > 0 ? durationMin + 'm ' : ''}${durationSec}s`;

  return (
    <SceneListItemWrapper onClick={onClick} active={active}>
      <img src={thumbnails} alt="" />
      {startTimecode} ~ {endTimecode}
      <span>{duration}</span>
    </SceneListItemWrapper>
  );
}
