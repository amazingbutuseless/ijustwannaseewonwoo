import { useCallback, useContext, useRef, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

import { PreferenceContext } from 'contexts/PreferenceContext';

const VIDEO_STATE = {
  notStarted: -1,
  ended: 0,
  playing: 1,
  paused: 2,
  buffering: 3,
  cued: 5,
};

export default function useYoutubePlayer(
  videoId: string,
  scenes: Video.Scene[],
  sceneRefs: React.MutableRefObject<HTMLButtonElement[]>,
  startTimeFromUrl?: string
) {
  const { autoplay } = useContext(PreferenceContext);

  const playerInstance = useRef<ReturnType<YouTube['getInternalPlayer']>>();
  const videoTimer = useRef<number>();
  const currentScene = useRef<number>(-1);

  const [stopTo, setStopTo] = useState<number>();

  const changeCurrentScene = useCallback(
    (nextSceneIdx: number) => {
      if (currentScene.current >= 0) {
        sceneRefs.current[currentScene.current]?.classList.remove('active');
      }

      if (nextSceneIdx >= 0) {
        sceneRefs.current[nextSceneIdx].classList.add('active');
      }
      currentScene.current = nextSceneIdx;
    },
    [currentScene, sceneRefs]
  );

  const onReady: YouTubeProps['onReady'] = ({ target }) => {
    playerInstance.current = target;

    if (startTimeFromUrl) {
      const startTime = parseInt(startTimeFromUrl, 10);
      const sceneIdx = scenes.findIndex((scene) => scene.startTime === startTime);
      if (sceneIdx > -1) {
        playBetween(scenes[sceneIdx].startTime, scenes[sceneIdx].endTime);
      }
    } else if (scenes.length > 0) {
      playBetween(scenes[0].startTime, scenes[0].endTime);
    }
  };

  const onPlay = useCallback(() => {
    if (videoTimer.current) {
      window.clearInterval(videoTimer.current);
    }

    if (!stopTo) {
      changeCurrentScene(-1);
      return;
    }

    const stopCurrentScene = () => {
      const currentTime = playerInstance.current.getCurrentTime();

      if (stopTo && currentTime >= stopTo) {
        window.clearInterval(videoTimer.current);
        setStopTo(undefined);

        const hasNextScene = currentScene.current >= 0 && currentScene.current < scenes.length - 1;
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

      playerInstance.current.seekTo(startTime, true);
      if (playerInstance.current.getPlayerState() !== VIDEO_STATE.playing) {
        playerInstance.current.playVideo();
      }
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
