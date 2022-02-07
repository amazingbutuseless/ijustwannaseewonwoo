import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import YouTube from 'react-youtube';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { CircularProgress, Container, Grid } from '@mui/material';
import useSWR from 'swr';

import ScenesSection from 'components/ScenesSection/SceneSection';
import Scene from 'components/Scene';
import API from 'config/amplify';
import useYoutubePlayer from 'helpers/useYoutubePlayer';

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

async function fetchVideo(videoId: string) {
  const video = await API.graphql({
    query: `
    query getVideo($videoId: String) {
      getVideo(where: { videoId: $videoId }) {
        data {
          id
          title
          forWonwoo
        }
      }
    }`,
    variables: {
      videoId,
    },
  });

  const internalVideoId = video?.data?.getVideo?.data?.id || null;
  let scenes = {};

  if (internalVideoId) {
    scenes = await API.graphql({
      query: `
      query listScenes($listSceneParams: SceneListWhereInput) {
        listScenes(where: $listSceneParams, sort: [startTime_ASC]) {
          data {
            id
            startTime
            endTime
            thumbnailUrl
          }
        }
      }`,
      variables: {
        listSceneParams: {
          video: {
            id: internalVideoId,
          },
        },
      },
    });
  }

  return {
    ...video?.data?.getVideo?.data,
    scenes: scenes.data?.listScenes?.data || [],
  };
}

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
  const { videoId } = router.query;

  const { data: video, error } = useSWR(`/video/${videoId}`, () => {
    return fetchVideo(videoId as string);
  });
  const isLoading = !video && !error;

  const sceneRefs = React.useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    return () => {
      sceneRefs.current = [];
    };
  }, [videoId]);

  const addSceneRef = React.useCallback((ref: HTMLButtonElement) => {
    sceneRefs.current.push(ref);
  }, []);

  const { onReady, onPlay, onSceneClick } = useYoutubePlayer(video?.scenes || [], sceneRefs);

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
                opts={{ playerVars: { controls: 1 } }}
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
