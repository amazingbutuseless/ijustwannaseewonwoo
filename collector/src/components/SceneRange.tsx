import React, { ChangeEvent, ReactElement } from 'react';
import { TimeInput } from './SceneRange.style';

interface SceneRangeProps {
  createRangeRef: (input: HTMLInputElement) => void;
  onTimeUpdate: (e: ChangeEvent) => void;
}

export default function SceneRange({
  createRangeRef,
  onTimeUpdate,
}: SceneRangeProps): ReactElement {
  return (
    <>
      <TimeInput name="startMin" ref={createRangeRef} onChange={onTimeUpdate} />
      :
      <TimeInput name="startSec" max="59" ref={createRangeRef} onChange={onTimeUpdate} />
      ~
      <TimeInput name="endMin" ref={createRangeRef} onChange={onTimeUpdate} />
      :
      <TimeInput name="endSec" max="59" ref={createRangeRef} onChange={onTimeUpdate} />
    </>
  );
}
