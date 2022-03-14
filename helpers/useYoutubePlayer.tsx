import { useCallback, useContext, useRef, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

import { PreferenceContext } from 'contexts/PreferenceContext';

export default function useYoutubePlayer(
  videoId: string,
  scenes: Video.Scene[],
  sceneRefs: React.MutableRefObject<HTMLButtonElement[]>,
  startTimeFromUrl?: string
) {
  const { autoplay } = useContext(PreferenceContext);

  const playerInstance = useRef<ReturnType<YouTube['getInternalPlayer']>>();
  const videoTimer = useRef<number>();
  const currentScene = useRef<number>();

  const [stopTo, setStopTo] = useState<number>();

  const changeCurrentScene = useCallback(
    (nextSceneIdx?: number) => {
      if (typeof currentScene.current !== 'undefined') {
        sceneRefs.current[currentScene.current]?.classList.remove('active');
      }

      if (typeof nextSceneIdx !== 'undefined' && nextSceneIdx >= 0) {
        sceneRefs.current[nextSceneIdx].classList.add('active');
        currentScene.current = nextSceneIdx;
      }
    },
    [currentScene]
  );

  const onReady: YouTubeProps['onReady'] = ({ target }) => {
    playerInstance.current = target;

    if (startTimeFromUrl) {
      const startTime = parseInt(startTimeFromUrl, 10);
      const sceneIdx = scenes.findIndex((scene) => scene.startTime === startTime);
      if (sceneIdx > -1) {
        playerInstance.current.seekTo(startTime, true);
        changeCurrentScene(sceneIdx);
        setStopTo(scenes[sceneIdx].endTime);
      }
    } else if (scenes.length > 0) {
      playerInstance.current.seekTo(scenes[0].startTime, true);
      setStopTo(scenes[0].endTime);
      changeCurrentScene(0);
    }
  };

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
  }, [stopTo, autoplay]);

  const playBetween = (startTime: number, endTime: number) => {
    if (playerInstance.current) {
      setStopTo(endTime);

      const sceneIdx = scenes.findIndex((scene) => scene.startTime === startTime && scene.endTime === endTime);
      changeCurrentScene(sceneIdx);

      playerInstance.current.loadVideoById({
        videoId,
        startSeconds: startTime,
      });
    }
  };

  const getCurrentTime = useCallback(() => {
    if (playerInstance.current) {
      return playerInstance.current.getCurrentTime();
    }
    return null;
  }, [playerInstance]);

  return {
    onReady,
    onPlay,
    playBetween,
    getCurrentTime,
  };
}
