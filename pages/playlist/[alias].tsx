import { useCallback } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Typography } from '@mui/material';

import API, { ENDPOINT } from 'config/amplify';
import VideoSection from 'components/VideoSection';
import useSWR from 'swr';

interface Props {
  playlist: Playlist.Entities;
}

async function fetchVideos(resourceId: string) {
  const playlistVideos = await API.get(ENDPOINT.YOUTUBE, resourceId, {});
  return playlistVideos?.items || [];
}

export default function Playlist({ playlist }: Props) {
  const router = useRouter();

  const { data, error } = useSWR(`/playlist/${playlist.playlistId}`, fetchVideos);

  const handleVideoClick = useCallback((videoId: string) => {
    router.push(`/video/${videoId}`);
  }, []);

  return (
    <>
      <Head>
        <title>{playlist.title} - ijustwannasee</title>
      </Head>

      <main>
        <header>
          background img
          <Container>
            <Typography variant="h2">{playlist.title}</Typography>
            {playlist.description && (
              <Typography variant="body1" component="p">
                {playlist.description}
              </Typography>
            )}
          </Container>
        </header>

        <VideoSection isLoading={!data && !error} videos={data} onClick={handleVideoClick} />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await API.graphql({
    query: `{listPlaylists{
      data {
        playlistId
        alias
        title
        description
        coverImg
      }
    }}`,
  });

  const paths =
    data?.listPlaylists?.data?.map((playlist: Playlist.Entities) => ({ params: { alias: playlist.alias } })) || [];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await API.graphql({
    query: `query getPlaylists($getPlaylistsParams: PlaylistsGetWhereInput!) {
      getPlaylists(where: $getPlaylistsParams) {
        data {
          playlistId
          title
          description
          coverImg
        }
      }
    }`,
    variables: {
      getPlaylistsParams: {
        alias: params?.playlistId,
      },
    },
  });

  return {
    props: {
      playlist: data?.getPlaylists?.data,
    },
  };
};