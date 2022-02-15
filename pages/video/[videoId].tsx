import React, { useCallback, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import YouTube from 'react-youtube';
import styled from '@emotion/styled';
import { CircularProgress, Container, Grid } from '@mui/material';

import ScenesSection from 'components/ScenesSection/SceneSection';
import Scene from 'components/Scene';
import useYoutubePlayer from 'helpers/useYoutubePlayer';
import useVideoDetails from 'helpers/useVideoDetails';

const VideoPlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

function VideoLoading() {
  return (
    <>
      <Head>
        <title>loading - ijustwannasee</title>
      </Head>

      <Container component="main">
        <Grid container justifyContent="center" alignItems="center" direction="column">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default function Video() {
  const router = useRouter();
  const { videoId, t } = router.query;

  const { video, isLoading } = useVideoDetails(videoId as string);

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

  if (isLoading) {
    return <VideoLoading />;
  }

  return (
    <>
      <Head>
        <title>{video.title} - ijustwannasee</title>
      </Head>

      <Container component="main">
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} sm={12} md={9}>
            <VideoPlayerWrapper>
              <YouTube
                videoId={videoId as string}
                opts={{ playerVars: { controls: 1, autoplay: 1 } }}
                onReady={onReady}
                onPlay={onPlay}
              />
            </VideoPlayerWrapper>
          </Grid>

          <Grid item xs={12} sm={12} md={3} sx={{ p: 1 }}>
            <ScenesSection>
              {video.scenes &&
                video.scenes.map((scene: Video.Scene) => (
                  <Scene
                    key={scene.id}
                    thumbnailUrl={scene.thumbnailUrl}
                    startTime={scene.startTime}
                    endTime={scene.endTime}
                    onClick={onSceneClick}
                    ref={addSceneRef}
                  />
                ))}
            </ScenesSection>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
