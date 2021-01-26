import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/youtube';

import { VideoPlayerWrapper } from './VideoPlayer.style';

interface VideoPlayerProps {
  videoId: string;
  start?: string;
  end?: string;
}

export default function VideoPlayer({ videoId, start = '', end = '' }: VideoPlayerProps) {
  const player = useRef(null);

  useEffect(() => {
    if (player.current) {
      player.current.seekTo(start);
    }
  }, [player.current]);

  return (
    <ReactPlayer
      ref={player}
      url={`https://www.youtube.com/watch?v=${videoId}`}
      config={{
        youtube: {
          playerVars: { autoplay: 1 },
        },
      }}
    />
  );
  return (
    <VideoPlayerWrapper>
      <iframe
        src={`https://www.youtube.com./embed/${videoId}?t=${start}&autoplay=1`}
        frameBorder="0"
      />
    </VideoPlayerWrapper>
  );
}
