import { ipcRenderer } from 'electron';
import React, { FormEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { ISceneAddFormProps, SceneTimecodeInterface } from '../../types';

import { addScene } from './scenesSlice';

import { SceneAddFormContainer, TimeInput, CloseButton } from './SceneAddForm.style';

export default function SceneAddForm({
  visible,
  videoId,
  onTimecodeSet,
  onSceneAdded,
  onCloseButtonClick,
}: ISceneAddFormProps) {
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

  const resetTimeInput = () => {
    startMin.current.value = '';
    startSec.current.value = '';
    endMin.current.value = '';
    endSec.current.value = '';
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(addScene({ videoId, ...getTimecode() }));
    ipcRenderer.send('from-main-to-worker', { action: 'prepare', videoId, ...getTimecode() });

    resetTimeInput();

    onSceneAdded();
  };

  const onTimeUpdate = (e) => {
    const timecode = getTimecode();

    onTimecodeSet({
      start: e.target.name.startsWith('start') ? timecode.start : timecode.end,
      end: e.target.name.startsWith('end') ? timecode.end : null,
    });
  };

  const onFormCloseButtonClick = () => {
    resetTimeInput();
    onCloseButtonClick();
  };

  const playDuration = () => {
    onTimecodeSet(getTimecode());
  };

  return (
    <SceneAddFormContainer action="#" onSubmit={onSubmit} visible={visible}>
      <CloseButton onClick={onFormCloseButtonClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="black"
          width="24px"
          height="24px"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </CloseButton>
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
