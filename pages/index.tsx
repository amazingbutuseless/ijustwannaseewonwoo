import { useCallback } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

import VideoSection from 'components/VideoSection';
import { Queries as PlaylistQueries, FetchListResponse } from 'api/playlist';
import { Queries as VideoQueries, FetchRecentlyAddedResponse } from 'api/video';
import PlaylistSection, { PlaylistSectionProps } from 'components/PlaylistSection';
import { request } from 'helpers/request';

interface Props extends PlaylistSectionProps {
  recentlyAddedVideos: Video.Entities[];
}

export default function Home({ playlist = [], recentlyAddedVideos = [] }: Props) {
  const { t } = useTranslation('home');
  const router = useRouter();

  const handleVideoClick = useCallback((videoId: string, title: string) => {
    router.push({ pathname: `/video/${videoId}`, query: { title } }, `/video/${videoId}`);
  }, []);

  return (
    <>
      <Head>
        <title>{t('title')} - ijustwannasee</title>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>

      <main>
        <PlaylistSection playlist={playlist} />

        <VideoSection
          heading={<Typography variant="h2">{t('section.videos')}</Typography>}
          videos={recentlyAddedVideos}
          onVideoClick={handleVideoClick}
          isLoading={false}
        />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const payload = `{
    ${PlaylistQueries.fetchList}
    ${VideoQueries.fetchRecentlyAddedVideos}
  }`;

  const { listPlaylists, listVideos } = await request<FetchListResponse & FetchRecentlyAddedResponse>('/api/cms/read', {
    method: 'POST',
    body: { query: payload },
  });

  return {
    props: {
      playlist: listPlaylists?.data || [],
      recentlyAddedVideos: listVideos?.data || [],
    },
  };
};
