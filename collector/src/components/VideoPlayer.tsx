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

  const onProgress = ({ playedSeconds }: ReactPlayerOnProgressInterface) => {
    if (!Number.isNaN(timecode.end)) {
      if (Math.floor(playedSeconds) >= timecode.end) {
        onPaused();
        setPlaying(false);
      }
    }
  };

  useEffect(() => {
    if (player.current) {
      const start = parseInt(timecode.start);

      if (!Number.isNaN(start)) {
        player.current.seekTo(start);
        setPlaying(true);
      }
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
