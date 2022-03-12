import { useCallback } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

import VideoSection from 'components/VideoSection';
import { fetchList } from 'api/playlist';
import PlaylistSection, { PlaylistSectionProps } from 'components/PlaylistSection';

interface Props extends PlaylistSectionProps {
  recentlyAddedVideos: Video.Entities[];
}

export default function Home({ playlist = [], recentlyAddedVideos = [] }: Props) {
  const { t } = useTranslation('home');
  const router = useRouter();

  const handleVideoClick = useCallback((videoId: string) => {
    router.push(`/video/${videoId}`);
  }, []);

  return (
    <>
      <Head>
        <title>{t('title')} - ijustwannasee</title>
      </Head>

      <main>
        <PlaylistSection playlist={playlist} />

        <VideoSection
          heading={<Typography variant="h2">{t('section.videos')}</Typography>}
          videos={recentlyAddedVideos}
          onClick={handleVideoClick}
          isLoading={false}
        />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const playlist = await fetchList();

  return {
    props: {
      playlist: playlist?.listPlaylists?.data,
      recentlyAddedVideos: [],
    },
  };
};
