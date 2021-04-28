import React from 'react';

import { SceneTimecodeInterface, SceneItemInterface } from '../types';

import {
  SceneListItemWrapper,
  SceneListItemEmptyWrapper,
  SceneThumbnail,
  SceneDetails,
} from './SceneListItem.style';

export interface WithRegisterRef {
  registerRef: (elm: HTMLLIElement) => void;
}

interface SceneListItemProps extends SceneItemInterface, WithRegisterRef {
  onSceneClick: ({ start, end }: SceneTimecodeInterface) => void;
  active?: boolean;
}

export function EmptyItem() {
  return (
    <SceneListItemEmptyWrapper>
      아직 등록된 장면이 없습니다.
      <br />
      장면을 추가해주세요.
    </SceneListItemEmptyWrapper>
  );
}

export default function SceneListItem({
  thumbnail,
  start,
  end,
  onSceneClick,
  registerRef,
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
    <SceneListItemWrapper onClick={onClick} active={active} ref={registerRef}>
      <SceneThumbnail src={thumbnail} alt="" />
      <SceneDetails>
        {startTimecode} ~ {endTimecode}
        <span>{duration}</span>
      </SceneDetails>
    </SceneListItemWrapper>
  );
}
