import { useCallback } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import PlaylistDetails from 'components/PlaylistDetails';
import VideoSection from 'components/VideoSection';
import usePlaylistVideos from 'helpers/usePlaylistVideos';
import { FetchListResponse, GetByAliasResponse, Queries } from 'api/playlist';
import { request } from 'helpers/request';
import Loading from 'components/Loading';

interface Props {
  playlist: Playlist.Entities;
}

export default function Playlist({ playlist }: Props) {
  const router = useRouter();

  const { isLoading, videos, ShowMoreButton } = usePlaylistVideos(playlist.playlistId);

  const handleVideoClick = useCallback((videoId: string, title: string) => {
    router.push({ pathname: `/video/${videoId}`, query: { title } }, `/video/${videoId}`);
  }, []);

  return (
    <>
      <Head>
        <title>{playlist.title} - ijustwannasee</title>
      </Head>

      <main>
        <PlaylistDetails {...playlist}>
          {isLoading && <Loading />}
          <VideoSection videos={videos} onVideoClick={handleVideoClick} />
          <ShowMoreButton />
        </PlaylistDetails>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { listPlaylists } = await request<FetchListResponse>('/api/cms/read', {
    method: 'POST',
    body: { query: `{${Queries.fetchList}}` },
  });

  const paths = (listPlaylists?.data || []).map((playlist) => ({ params: { alias: playlist.alias } })) || [];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { getPlaylists } = await request<GetByAliasResponse>('/api/cms/read', {
    method: 'POST',
    body: { query: Queries.getByAlias, variables: { alias: params?.alias as string } },
  });

  return {
    props: {
      playlist: getPlaylists?.data || {},
    },
  };
};
