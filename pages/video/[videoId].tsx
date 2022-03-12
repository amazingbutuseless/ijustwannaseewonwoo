import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CircularProgress, Container, Grid } from '@mui/material';

import useVideoDetails from 'helpers/useVideoDetails';
import VideoDetails from 'components/VideoDetails';

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

  if (isLoading) {
    return <VideoLoading />;
  }

  return (
    <>
      <Head>
        <title>{video.title} - ijustwannasee</title>
      </Head>

      <VideoDetails videoId={videoId as string} t={t as string} video={video} />
    </>
  );
}
