import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

import { SceneTimecodeInterface } from '../types';

import { VideoPlayerWrapper } from './VideoPlayer.style';

interface VideoPlayerProps {
  videoId: string;
  timecode: SceneTimecodeInterface;
  onPaused: () => void;
}

interface ReactPlayerOnProgressInterface {
  playedSeconds: number;
}

export default function VideoPlayer({ videoId, timecode, onPaused }: VideoPlayerProps) {
  const player = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const onProgress = ({ playedSeconds }: ReactPlayerOnProgressInterface) => {
    if (timecode.end) {
      const current = Math.floor(playedSeconds);
      setCurrentTime(current);

      if (current >= timecode.end) {
        onPaused();
        setPlaying(false);
      }
    }
  };

  const onSeek = (e) => {
    console.log(e);
  };

  useEffect(() => {
    if (player.current) {
      player.current.seekTo(timecode.start);
      setPlaying(true);
    }
  }, [timecode.start]);

  return (
    <VideoPlayerWrapper>
      <ReactPlayer
        ref={player}
        url={`https://www.youtube.com/watch?v=${videoId}`}
        playing={playing}
        config={{
          playerVars: {
            controls: 1,
          },
        }}
        onProgress={onProgress}
        width="100%"
        height="100%"
      />
    </VideoPlayerWrapper>
  );
}
