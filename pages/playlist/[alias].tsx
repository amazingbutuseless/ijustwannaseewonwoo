import { useCallback } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import API, { ENDPOINT } from 'config/amplify';
import PlaylistDetails from 'components/PlaylistDetails';
import VideoSection from 'components/VideoSection';

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
  const isLoading = !data && !error;

  const handleVideoClick = useCallback((videoId: string) => {
    router.push(`/video/${videoId}`);
  }, []);

  return (
    <>
      <Head>
        <title>{playlist.title} - ijustwannasee</title>
      </Head>

      <PlaylistDetails {...playlist}>
        <VideoSection isLoading={isLoading} videos={data} onClick={handleVideoClick} />
      </PlaylistDetails>
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
