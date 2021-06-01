import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

import { SceneTimecodeInterface, Video } from '../types';

import { VideoPlayerWrapper } from './VideoPlayer.style';

interface VideoPlayerProps extends Video {
  timecode: SceneTimecodeInterface;
  onPaused: () => void;
}

interface ReactPlayerOnProgressInterface {
  playedSeconds: number;
}

const VideoPlayer = React.forwardRef(
  ({ videoId, timecode, onPaused }: VideoPlayerProps, player) => {
    const [playing, setPlaying] = useState(false);

    const onProgress = ({ playedSeconds }: ReactPlayerOnProgressInterface) => {
      if (timecode.end) {
        const current = Math.floor(playedSeconds);

        if (current >= timecode.end) {
          onPaused();
          setPlaying(false);
        }
      }
    };

    useEffect(() => {
      // @ts-ignore
      if (player.current && timecode.start > -1) {
        // @ts-ignore
        player.current.seekTo(timecode.start);
        setPlaying(true);
      }
    }, [timecode.start]);

    return (
      <VideoPlayerWrapper>
        <ReactPlayer
          // @ts-ignore
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
);

export default VideoPlayer;
