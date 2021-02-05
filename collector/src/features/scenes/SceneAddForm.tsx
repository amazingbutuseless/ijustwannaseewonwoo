import React, { FormEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { SceneAddFormProps, SceneTimecodeInterface } from '../../types';

import { addScene } from './scenesSlice';

import { SceneAddFormWrapper, SceneAddFormContainer, TimeInput } from './SceneAddForm.style';

export default function SceneAddForm({ visible, videoId, onTimecodeSet }: SceneAddFormProps) {
  const dispatch = useDispatch();

  const startMin = useRef<HTMLInputElement>(null);
  const startSec = useRef<HTMLInputElement>(null);
  const endMin = useRef<HTMLInputElement>(null);
  const endSec = useRef<HTMLInputElement>(null);

  const getTimecode = (): SceneTimecodeInterface => {
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
    <SceneAddFormContainer action="#" onSubmit={onSubmit} visible={visible}>
      <TimeInput name="start_min" ref={startMin} onChange={onTimeUpdate} />
      :
      <TimeInput name="start_sec" max="59" ref={startSec} onChange={onTimeUpdate} />
      ~
      <TimeInput name="end_min" ref={endMin} onChange={onTimeUpdate} />
      :
      <TimeInput name="end_sec" max="59" ref={endSec} onChange={onTimeUpdate} />
      <button type="button" onClick={playDuration}>
        재생
      </button>
      <button type="submit" onClick={onSubmit}>
        추가
      </button>
    </SceneAddFormContainer>
  );
}
