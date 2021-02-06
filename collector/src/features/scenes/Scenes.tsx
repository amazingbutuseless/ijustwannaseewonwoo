import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import { SceneTimecodeInterface } from '../../types';

import { fetchScenes, selectAllScenesForVideo } from './scenesSlice';

import SceneListItem from '../../components/SceneListItem';
import { SceneList, SceneWrapper, AddSceneButton } from './Scenes.style';

interface SceneProps {
  videoId: string;
  onSceneClick: ({ start, end }: SceneTimecodeInterface) => void;
  onAddSceneButtonClick: () => void;
  activeSceneIdx?: number;
}

const SceneListItemEmptyWrapper = styled.li`
  display: inline-block;
  font-size: 1.4rem;
  color: var(--silver-chalice);
  cursor: pointer;
`;

function SceneListItemEmpty({ onClick }) {
  return (
    <SceneListItemEmptyWrapper onClick={onClick}>
      아직 등록된 장면이 없습니다.
      <br />
      장면을 추가해주세요.
    </SceneListItemEmptyWrapper>
  );
}

export default function Scenes({
  videoId,
  onSceneClick,
  onAddSceneButtonClick,
  activeSceneIdx = -1,
}: SceneProps) {
  const dispatch = useDispatch();

  const scenes = useSelector((state) => selectAllScenesForVideo(state, videoId));
  const scenesStatus = useSelector((state) => state.scenes.status);

  useEffect(() => {
    dispatch(fetchScenes(videoId));
  }, [videoId]);

  const SceneItems = () => {
    return (
      <>
        {scenes.map((scene, idx) => (
          <SceneListItem key={`scene-${idx + 1}`} {...scene} onSceneClick={onSceneClick} />
        ))}
      </>
    );
  };

  return (
    <SceneWrapper>
      <div style={{ overflow: 'hidden' }}>
        <SceneList activeItemIdx={activeSceneIdx}>
          {scenesStatus === 'pending' && <span>loading...</span>}
          {scenesStatus === 'succeeded' &&
            ((scenes.length > 0 && <SceneItems />) ||
              (scenes.length < 1 && <SceneListItemEmpty onClick={onAddSceneButtonClick} />))}
        </SceneList>
      </div>
      <AddSceneButton onClick={onAddSceneButtonClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="24px"
          height="24px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" />
        </svg>
        <span>장면 추가</span>
      </AddSceneButton>
    </SceneWrapper>
  );
}
