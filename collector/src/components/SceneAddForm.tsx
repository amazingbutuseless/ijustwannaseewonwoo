import React, { ChangeEvent, FormEvent, useState } from 'react';

import { SceneTimecodeInterface } from '../types';
import AddSceneGuideButton from './AddSceneGuideButton';
import AddSceneGuideModalDialog from './AddSceneGuideModalDialog';

import { SceneAddFormContainer, Button } from './SceneAddForm.style';

import SceneRange from './SceneRange';

interface rangeInputSets {
  [name: string]: HTMLInputElement;
}

interface SceneAddFormProps {
  onTimecodeSet: ({ start, end }: SceneTimecodeInterface) => void;
  onSubmit: ({ start, end }: SceneTimecodeInterface, callback: () => void) => void;
}

export default function SceneAddForm({ onTimecodeSet, onSubmit }: SceneAddFormProps) {
  const [showGuideModalDialog, switchShowGuideModalDialog] = useState(false);

  const rangeInput: rangeInputSets = {};
  const createRangeInput = (input: HTMLInputElement) => {
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

  const onTimeUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const timecode = getTimecode();

    onTimecodeSet({
      start: e.target.name.startsWith('start') ? timecode.start : timecode.end,
      end: e.target.name.startsWith('end') ? timecode.end : null,
    });
  };

  const onPlayButtonClick = () => {
    onTimecodeSet(getTimecode());
  };

  const onAddButtonClick = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({ ...getTimecode() }, resetTimeInput);
  };

  const onGuideButtonClick = () => {
    switchShowGuideModalDialog(true);
  };

  return (
    <>
      <SceneAddFormContainer action="#" onSubmit={onAddButtonClick}>
        <SceneRange createRangeRef={createRangeInput} onTimeUpdate={onTimeUpdate} />
        <Button type="button" onClick={onPlayButtonClick}>
          재생
        </Button>
        <Button type="submit" onClick={onAddButtonClick}>
          추가
        </Button>
        <AddSceneGuideButton onClick={onGuideButtonClick} />
      </SceneAddFormContainer>
      {showGuideModalDialog && (
        <AddSceneGuideModalDialog
          onConfirm={() => {
            switchShowGuideModalDialog(false);
          }}
        />
      )}
    </>
  );
}
