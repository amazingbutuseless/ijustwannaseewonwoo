import React, { FormEvent, useRef } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { SceneAddFormProps, SceneTimecodeInterface, SceneItemInterface } from '../types';

import { addScene } from '../actions/video';

import SceneListItem from '../components/SceneListItem';
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

function SceneAddForm({ videoId, onTimecodeSet }: SceneAddFormProps) {
  const startMin = useRef<HTMLInputElement>(null);
  const startSec = useRef<HTMLInputElement>(null);
  const endMin = useRef<HTMLInputElement>(null);
  const endSec = useRef<HTMLInputElement>(null);

  const addScene = (e) => {
    e.preventDefault();

    console.log('add scene');
  };

  const onTimeUpdate = () => {
    const startMinTime = startMin.current.value.length > 0 ? parseInt(startMin.current.value) : 0;
    const startSecTime = startSec.current.value.length > 0 ? parseInt(startSec.current.value) : 0;
    const endMinTime = endMin.current.value.length > 0 ? parseInt(endMin.current.value) : 0;
    const endSecTime = endSec.current.value.length > 0 ? parseInt(endSec.current.value) : 0;

    onTimecodeSet({
      start: startMinTime * 60 + startSecTime,
      end: endMinTime > 0 || endSecTime > 0 ? endMinTime * 60 + endSecTime : null,
    });
  };

  return (
    <div>
      <h3>장면 추가</h3>
      <AddSceneContainer action="" onSubmit={addScene}>
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
        <input type="hidden" name="videoId" value={videoId} />
        <Button type="submit" onClick={addScene}>
          추가
        </Button>
      </AddSceneContainer>
    </div>
  );
}

interface SceneProps {
  videoId: string;
  scenes: SceneInterface[];
  onTimecodeSet: ({ start, end }: SceneTimecodeInterface) => void;
  onSceneClick: ({ start, end }: SceneTimecodeInterface) => void;
}

export default function Scenes({ videoId, scenes, onTimecodeSet, onSceneClick }: SceneProps) {
  return (
    <SceneWrapper>
      <SceneAddForm videoId={videoId} onTimecodeSet={onTimecodeSet} />

      <div>
        <h3>😺🍿 장면들</h3>
        <SceneList>
          <SceneListItem title={'test'} start={30} end={40} onSceneClick={onTimecodeSet} />
          {scenes.map((scene) => (
            <SceneListItem {...scene} onSceneClick={onSceneClick} />
          ))}
        </SceneList>
      </div>
    </SceneWrapper>
  );
}
