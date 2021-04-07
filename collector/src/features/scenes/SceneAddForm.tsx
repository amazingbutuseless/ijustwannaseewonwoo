import { ipcRenderer } from 'electron';
import React, { FormEvent, RefObject, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ISceneAddFormProps, SceneTimecodeInterface } from '../../types';

import { selectVideoById, registerVideo } from '../videos/videosSlice';
import { addScene } from './scenesSlice';

import { SceneAddFormContainer } from './SceneAddForm.style';

import SceneAddFormCloseButton from '../../components/SceneAddFormCloseButton';
import SceneRange from '../../components/SceneRange';

interface rangeInputSets {
  [name: string]: RefObject<HTMLInputElement>;
}

export default function SceneAddForm({
  visible,
  videoId,
  onTimecodeSet,
  onSceneAdded,
  onCloseButtonClick,
  playlistId,
}: ISceneAddFormProps) {
  const dispatch = useDispatch();

  const video = useSelector((state) => selectVideoById(state, videoId));

  const rangeInput: rangeInputSets = {};
  const createRangeInput = (input: RefObject<HTMLInputElement>) => {
    if (input) {
      rangeInput[input.name] = input;
    }
  };

  const getTimecode = (): SceneTimecodeInterface => {
    const startMinTime =
      rangeInput.startMin.value.length > 0 ? parseInt(rangeInput.startMin.value) : 0;
    const startSecTime =
      rangeInput.startSec.value.length > 0 ? parseInt(rangeInput.startSec.value) : 0;
    const endMinTime = rangeInput.endMin.value.length > 0 ? parseInt(rangeInput.endMin.value) : 0;
    const endSecTime = rangeInput.endSec.value.length > 0 ? parseInt(rangeInput.endSec.value) : 0;

    return {
      start: startMinTime * 60 + startSecTime,
      end: endMinTime > 0 || endSecTime > 0 ? endMinTime * 60 + endSecTime : null,
    };
  };

  const resetTimeInput = () => {
    rangeInput.startMin.value = '';
    rangeInput.startSec.value = '';
    rangeInput.endMin.value = '';
    rangeInput.endSec.value = '';
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!video) {
      dispatch(registerVideo({ videoId, playlistId }));
    }
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
      <SceneAddFormCloseButton onClick={onFormCloseButtonClick} />
      <SceneRange createRangeRef={createRangeInput} onTimeUpdate={onTimeUpdate} />
      <button type="button" onClick={playDuration}>
        재생
      </button>
      <button type="submit" onClick={onSubmit}>
        추가
      </button>
    </SceneAddFormContainer>
  );
}
