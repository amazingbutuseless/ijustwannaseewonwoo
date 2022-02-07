import { useCallback } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Typography } from '@mui/material';
import useSWR from 'swr';
import styled from '@emotion/styled';

import API, { ENDPOINT } from 'config/amplify';
import VideoSection from 'components/VideoSection';

interface Props {
  playlist: Playlist.Entities;
}

async function fetchVideos(resourceId: string) {
  const playlistVideos = await API.get(ENDPOINT.YOUTUBE, resourceId, {});
  return playlistVideos?.items || [];
}

const PlaylistCover = styled.header`
  display: flex;
  align-items: center;
  min-height: 600px;
  background-image: url(attr(data-cover));
  background-size: cover;

  h2 {
    margin-bottom: 1rem;
    font-weight: 500;
  }

  h2 + p {
    font-size: 1.6rem;
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
    min-height: 400px;
  }
`;

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
        <PlaylistCover data-cover={playlist.coverImg}>
          <Container>
            <Typography variant="h2">{playlist.title}</Typography>
            {playlist.description && (
              <Typography variant="body1" component="p">
                {playlist.description}
              </Typography>
            )}
          </Container>
        </PlaylistCover>

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
