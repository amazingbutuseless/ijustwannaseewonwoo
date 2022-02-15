import { useCallback, useContext, useRef, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

import { PlayerPreferenceContext } from 'contexts/PlayerPreference';

export default function useYoutubePlayer(
  scenes: Video.Scene[],
  sceneRefs: React.MutableRefObject<HTMLButtonElement[]>
) {
  const { autoplay } = useContext(PlayerPreferenceContext);

  const playerInstance = useRef<ReturnType<YouTube['getInternalPlayer']>>();
  const videoTimer = useRef<number>();
  const currentScene = useRef<number>();

  const [stopTo, setStopTo] = useState<number>();

  const onReady: YouTubeProps['onReady'] = ({ target }) => {
    playerInstance.current = target;
  };

  const changeCurrentScene = useCallback((nextSceneIdx?: number) => {
    if (typeof currentScene.current !== 'undefined') {
      sceneRefs.current[currentScene.current].classList.remove('active');
    }

    if (typeof nextSceneIdx !== 'undefined') {
      sceneRefs.current[nextSceneIdx].classList.add('active');
      currentScene.current = nextSceneIdx;
    }
  }, []);

  const onPlay = useCallback(() => {
    if (videoTimer.current) {
      window.clearInterval(videoTimer.current);
    }

    if (!stopTo) {
      changeCurrentScene();
      return;
    }

    const stopCurrentScene = async () => {
      const currentTime = await playerInstance.current.getCurrentTime();

      if (stopTo && currentTime >= stopTo) {
        window.clearInterval(videoTimer.current);
        setStopTo(undefined);

        const hasNextScene = typeof currentScene.current !== 'undefined' && currentScene.current < scenes.length - 1;

        if (autoplay && hasNextScene) {
          sceneRefs.current[(currentScene.current as number) + 1].click();
          return;
        }

        playerInstance.current.pauseVideo();
      }
    };

    videoTimer.current = window.setInterval(stopCurrentScene, 200);
  }, [stopTo]);

  const onSceneClick = (startTime: number, endTime: number) => {
    if (playerInstance.current) {
      setStopTo(endTime);

      const sceneIdx = scenes.findIndex((scene) => scene.startTime === startTime && scene.endTime === endTime);
      changeCurrentScene(sceneIdx);

      playerInstance.current.seekTo(startTime, true);
      window.setTimeout(() => {
        if (playerInstance.current.getPlayerState() !== YouTube.PlayerState.PLAYING) {
          playerInstance.current.playVideo();
        }
      }, 200);
    }
  };

  return {
    onReady,
    onPlay,
    onSceneClick,
  };
}
