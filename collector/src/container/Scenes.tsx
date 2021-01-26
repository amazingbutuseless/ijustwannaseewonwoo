import React, { useRef } from 'react';

import { SceneList, SceneWrapper } from './Scenes.style';

import SceneListItem, { SceneInterface, SceneTimecodeInterface } from '../components/SceneListItem';

interface SceneAddFormProps {
  videoId: string;
  onTimecodeSet: ({ start, end }: SceneTimecodeInterface) => void;
}

function SceneAddForm({ videoId, onTimecodeSet }: SceneAddFormProps) {
  const start = useRef<HTMLInputElement>(null);
  const end = useRef<HTMLInputElement>(null);

  const addScene = (e) => {
    e.preventDefault();

    console.log('add scene');
  };

  const convertToSeconds = (minsAndSeconds: string) => {
    const [mins, secs] = minsAndSeconds.split(':');
    return parseInt(mins) * 60 + parseInt(secs);
  };

  const onTimeUpdate = () => {
    const startTimecode = convertToSeconds(start.current.value).toString();
    const endTimecode = convertToSeconds(end.current.value).toString();

    onTimecodeSet({
      start: startTimecode,
      end: endTimecode,
    });
  };

  return (
    <form action="" onSubmit={addScene}>
      <input type="text" name="start" ref={start} onChange={onTimeUpdate} />
      <input type="text" name="end" ref={end} onChange={onTimeUpdate} />

      <input type="hidden" name="videoId" value={videoId} />

      <button type="submit" onClick={addScene}>
        add
      </button>
    </form>
  );
}

interface SceneProps {
  videoId: string;
  scenes: SceneInterface[];
  onTimecodeSet: ({ start, end }: SceneTimecodeInterface) => void;
}

export default function Scenes({ videoId, scenes, onTimecodeSet }: SceneProps) {
  return (
    <SceneWrapper>
      <SceneAddForm videoId={videoId} onTimecodeSet={onTimecodeSet} />

      <SceneList>
        {scenes.map((scene) => (
          <SceneListItem {...scene} onSceneClick={onTimecodeSet} />
        ))}
      </SceneList>
    </SceneWrapper>
  );
}
