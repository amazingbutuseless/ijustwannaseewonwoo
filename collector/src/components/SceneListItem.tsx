import React from 'react';

import { SceneTimecodeInterface, SceneItemInterface } from '../types';

import { SceneListItemWrapper } from './SceneListItem.style';

interface SceneListItemProps extends SceneItemInterface {
  onSceneClick: ({ start, end }: SceneTimecodeInterface) => void;
  active?: boolean;
}

export default function SceneListItem({
  thumbnail,
  start,
  end,
  onSceneClick,
  active = false,
}: SceneListItemProps) {
  const onClick = () => {
    onSceneClick({ start, end });
  };

  const startTimecode = `${Math.floor(start / 60)}:${('00' + (start % 60)).substr(-2)}`;
  const endTimecode = `${Math.floor(end / 60)}:${('00' + (end % 60)).substr(-2)}`;
  const durationMin = Math.floor((end - start) / 60);
  const durationSec = (end - start) % 60;
  const duration = `${durationMin > 0 ? durationMin + 'm ' : ''}${durationSec}s`;

  return (
    <SceneListItemWrapper onClick={onClick} active={active}>
      <img src={thumbnail} alt="" />
      {startTimecode} ~ {endTimecode}
      <span>{duration}</span>
    </SceneListItemWrapper>
  );
}
