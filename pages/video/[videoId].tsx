import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import YouTube from 'react-youtube';
import styled from '@emotion/styled';
import { Container, Grid } from '@mui/material';

import ScenesSection from 'components/ScenesSection/SceneSection';
import Scene from 'components/Scene';

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

export default function Video() {
  const router = useRouter();
  const { videoId } = router.query;

  const [autoPlay, setAutoPlay] = useState(true);
  const handleAutoPlayChange = useCallback(() => {
    setAutoPlay(!autoPlay);
  }, []);

  const handleSceneClick = useCallback((startTime, endTime) => {}, []);

  return (
    <Container component="main">
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} sm={12} md={9}>
          <VideoPlayerWrapper>
            <YouTube videoId={videoId as string} opts={{ playerVars: { controls: 1 } }} />
          </VideoPlayerWrapper>
        </Grid>
        <Grid item xs={12} sm={12} md={3} sx={{ p: 1 }}>
          <ScenesSection autoPlay={autoPlay} onAutoPlayChange={handleAutoPlayChange}>
            <Scene thumbnail="" startTime="00:00" endTime="00:00" isPlaying={true} onClick={handleSceneClick} />
          </ScenesSection>
        </Grid>
      </Grid>
    </Container>
  );
}
