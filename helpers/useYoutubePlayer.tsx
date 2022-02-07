import { useCallback, useContext, useRef, useState } from 'react';

import { PlayerPreferenceContext } from 'contexts/PlayerPreference';

export default function useYoutubePlayer(
  scenes: Video.Scene[],
  sceneRefs: React.MutableRefObject<HTMLButtonElement[]>
) {
  const { autoplay } = useContext(PlayerPreferenceContext);

  const playerInstance = useRef();
  const videoTimer = useRef<number>();

  const [currentScene, setCurrentScene] = useState<number>();
  const [stopTo, setStopTo] = useState<number>();

  const onReady = ({ target }) => {
    playerInstance.current = target;
  };

  const onPlay = useCallback(() => {
    if (videoTimer.current) {
      window.clearInterval(videoTimer.current);
    }

    if (!stopTo) {
      return;
    }

    const stopCurrentScene = async () => {
      const currentTime = await playerInstance.current.getCurrentTime();

      if (stopTo && currentTime >= stopTo) {
        window.clearInterval(videoTimer.current);
        setStopTo(undefined);

        const hasNextScene = typeof currentScene !== 'undefined' && currentScene < scenes.length - 1;

        if (autoplay && hasNextScene) {
          sceneRefs.current[currentScene].classList.remove('active');
          sceneRefs.current[currentScene + 1].click();
          return;
        }

        playerInstance.current.pauseVideo();
      }
    };

    videoTimer.current = window.setInterval(stopCurrentScene, 200);
  }, [stopTo]);

  const onSceneClick = (startTime, endTime) => {
    if (playerInstance.current) {
      setStopTo(endTime);

      const sceneIdx = scenes.findIndex((scene) => scene.startTime === startTime && scene.endTime === endTime);
      if (currentScene) {
        sceneRefs.current[currentScene].classList.remove('active');
      }
      sceneRefs.current[sceneIdx].classList.add('active');
      setCurrentScene(sceneIdx);

      playerInstance.current.seekTo(startTime, true);

      if (playerInstance.current.getPlayerState() !== 1) {
        playerInstance.current.playVideo();
      }
    }
  };

  return {
    onReady,
    onPlay,
    onSceneClick,
  };
}
