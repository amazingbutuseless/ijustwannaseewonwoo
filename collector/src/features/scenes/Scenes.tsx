import React, { ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import { SceneAddFormProps, SceneTimecodeInterface, SceneItemInterface } from '../../types';

import { fetchScenes, addScene, selectAllScenesForVideo } from './scenesSlice';

import SceneListItem from '../../components/SceneListItem';
import { SceneList, SceneWrapper, AddSceneContainer } from './Scenes.style';

const Button = styled.button`
  margin-left: 1.6rem;
  padding: 0.8rem 1.6rem;

  border: 1px solid var(--pumpkin);
  border-radius: 2px;
  background-color: rgba(255, 109, 0, 0);

  color: var(--pumpkin);

  cursor: pointer;

  transition: background-color 200ms;

  &:hover {
    background-color: rgba(255, 109, 0, 1);

    color: var(--davys-grey);
  }
`;

function SceneAddForm({ videoId, publishedAt, onTimecodeSet }: SceneAddFormProps) {
  const dispatch = useDispatch();

  const startMin = useRef<HTMLInputElement>(null);
  const startSec = useRef<HTMLInputElement>(null);
  const endMin = useRef<HTMLInputElement>(null);
  const endSec = useRef<HTMLInputElement>(null);

  const getTimecode = () => {
    const startMinTime = startMin.current.value.length > 0 ? parseInt(startMin.current.value) : 0;
    const startSecTime = startSec.current.value.length > 0 ? parseInt(startSec.current.value) : 0;
    const endMinTime = endMin.current.value.length > 0 ? parseInt(endMin.current.value) : 0;
    const endSecTime = endSec.current.value.length > 0 ? parseInt(endSec.current.value) : 0;

    return {
      start: startMinTime * 60 + startSecTime,
      end: endMinTime > 0 || endSecTime > 0 ? endMinTime * 60 + endSecTime : null,
    };
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(addScene({ videoId, ...getTimecode() }));
  };

  const onTimeUpdate = (e) => {
    const timecode = getTimecode();

    onTimecodeSet({
      start: e.target.name.startsWith('start') ? timecode.start : timecode.end,
      end: e.target.name.startsWith('end') ? timecode.end : null,
    });
  };

  const playDuration = () => {
    onTimecodeSet(getTimecode());
  };

  return (
    <div>
      <h3>장면 추가</h3>
      <AddSceneContainer action="" onSubmit={onSubmit}>
        <input
          type="number"
          name="start_min"
          min="0"
          placeholder="00"
          ref={startMin}
          onChange={onTimeUpdate}
        />
        :
        <input
          type="number"
          name="start_sec"
          min="0"
          max="59"
          placeholder="00"
          ref={startSec}
          onChange={onTimeUpdate}
        />
        ~
        <input
          type="number"
          name="end_min"
          min="0"
          placeholder="00"
          ref={endMin}
          onChange={onTimeUpdate}
        />
        :
        <input
          type="number"
          name="end_sec"
          min="0"
          max="59"
          placeholder="00"
          ref={endSec}
          onChange={onTimeUpdate}
        />
        <Button type="button" onClick={playDuration}>
          재생
        </Button>
        <Button type="submit" onClick={onSubmit}>
          추가
        </Button>
      </AddSceneContainer>
    </div>
  );
}

interface SceneProps {
  videoId: string;
  publishedAt: string;
  scenes: SceneItemInterface[];
  onTimecodeSet: ({ start, end }: SceneTimecodeInterface) => void;
  onSceneClick: ({ start, end }: SceneTimecodeInterface) => void;
}

export default function Scenes({ videoId, publishedAt, onTimecodeSet, onSceneClick }: SceneProps) {
  const dispatch = useDispatch();

  const scenes = useSelector((state) => selectAllScenesForVideo(state, videoId));
  const scenesStatus = useSelector((state) => state.scenes.status);

  useEffect(() => {
    dispatch(fetchScenes(videoId));
  }, [videoId]);

  useEffect(() => {
    if (scenesStatus === 'succeeded' && scenes.length > 0) {
      const { start, end } = scenes[0];
      onTimecodeSet({ start, end });
    }
  }, [scenesStatus]);

  return (
    <SceneWrapper>
      <SceneAddForm videoId={videoId} publishedAt={publishedAt} onTimecodeSet={onTimecodeSet} />

      <div style={{ overflow: 'hidden' }}>
        <h3>😺🍿 장면들</h3>
        <SceneList>
          {scenesStatus === 'succeeded' &&
            scenes.map((scene, idx) => (
              <SceneListItem key={`scene-${idx + 1}`} {...scene} onSceneClick={onSceneClick} />
            ))}
        </SceneList>
      </div>
    </SceneWrapper>
  );
}
