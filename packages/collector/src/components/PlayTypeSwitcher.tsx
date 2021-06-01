import React, { useContext } from 'react';
import { PlayTypeSwitcherWrapper, PlayTypeLabel } from './PlayTypeSwitcher.style';

export const PlayTypeContext = React.createContext({
  playScenes: true,
  onChange: (playScene: boolean) => {},
});

export default function PlayTypeSwitcher() {
  const playType = useContext(PlayTypeContext);

  const handleChange = () => {
    console.log('handlChange', !playType.playScenes);
    playType.onChange(!playType.playScenes);
  };

  return (
    <PlayTypeSwitcherWrapper playScenes={playType.playScenes} onClick={handleChange}>
      <input type="checkbox" defaultChecked={playType.playScenes} />
      <PlayTypeLabel>장면 자동 재생</PlayTypeLabel>
    </PlayTypeSwitcherWrapper>
  );
}
