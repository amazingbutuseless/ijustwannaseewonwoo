import { useCallback } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';

import PlaylistDetails from 'components/PlaylistDetails';
import VideoSection from 'components/VideoSection';
import { fetchList, fetchVideos, getByAlias } from 'api/playlist';
import usePlaylistVideos from 'helpers/usePlaylistVideos';

interface Props {
  playlist: Playlist.Entities;
}

function Playlist({ playlist }: Props) {
  const router = useRouter();

  const { isLoading, videos, showMoreButton, onShowMoreButtonClick } = usePlaylistVideos(playlist.playlistId);

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
          <VideoSection isLoading={isLoading} videos={videos} onVideoClick={handleVideoClick} />
          {showMoreButton && (
            <button type="button" onClick={onShowMoreButtonClick}>
              Show More
            </button>
          )}
        </PlaylistDetails>
      </main>
    </>
  );
}

export default function Page({ playlist, fallback }: Props & { fallback: never }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Playlist playlist={playlist} />
    </SWRConfig>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { listPlaylists } = await fetchList()();

  const paths =
    (listPlaylists?.data || []).map((playlist: Playlist.Entities) => ({ params: { alias: playlist.alias } })) || [];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { getPlaylists } = await getByAlias(params?.alias as string)();
  const playlist = getPlaylists?.data || {};

  let videos = [];
  if (playlist) {
    videos = await fetchVideos(`/playlist/${playlist?.playlistId}`);
  }

  return {
    props: {
      playlist,
      fallback: {
        [`/playlist/${playlist.playlistId}`]: [videos],
      },
    },
  };
};
