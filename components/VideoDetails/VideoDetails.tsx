import React, { useCallback, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import { Box, Container, Grid, useMediaQuery } from '@mui/material';

import ScenesSection from 'components/ScenesSection/SceneSection';
import Scene from 'components/Scene';
import useYoutubePlayer from 'helpers/useYoutubePlayer';
import useShareDialog from 'helpers/useShareDialog';
import theme from 'config/theme';

import * as Styled from './style';

interface Props {
  videoId: string;
  t?: string;
  video: { scenes: Video.Scene[] };
}

export default function VideoDetails({ videoId, t, video }: Props) {
  const sceneRefs = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    return () => {
      sceneRefs.current = [];
    };
  }, [videoId]);

  const addSceneRef = useCallback((ref: HTMLButtonElement) => {
    sceneRefs.current.push(ref);
  }, []);

  const { onReady, onPlay, onSceneClick } = useYoutubePlayer(
    videoId as string,
    video?.scenes || [],
    sceneRefs,
    t as string
  );

  const { show: showShareDialog } = useShareDialog(`/video/${videoId}`);

  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Container component="main">
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} sm={12} md={3} sx={{ p: 1 }} order={2}>
          <ScenesSection>
            {video?.scenes &&
              video.scenes.map((scene: Video.Scene) => (
                <Scene
                  key={scene.id}
                  thumbnailUrl={scene.thumbnailUrl}
                  startTime={scene.startTime}
                  endTime={scene.endTime}
                  onClick={onSceneClick}
                  onShareButtonClick={showShareDialog}
                  ref={addSceneRef}
                />
              ))}
          </ScenesSection>
        </Grid>

        <Grid item xs={12} sm={12} md={9} position="sticky" top="var(--app-bar-height)" order={1}>
          <Box sx={{ margin: matches ? '0' : '-1.6rem', marginBottom: '0' }}>
            <Styled.VideoPlayerWrapper>
              <YouTube
                videoId={videoId as string}
                opts={{ playerVars: { controls: 1, autoplay: 1 } }}
                onReady={onReady}
                onPlay={onPlay}
              />
            </Styled.VideoPlayerWrapper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
