import { useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Container, Typography } from '@mui/material';

import VideoSection from 'components/VideoSection';

export default function Home({ recentlyAddedVideos = [] }) {
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

      <Container component="main">
        <section>
          <Typography variant="h2">{t('section.playlists')}</Typography>
        </section>

        <VideoSection
          title={t('section.videos')}
          videos={recentlyAddedVideos}
          onClick={handleVideoClick}
          isLoading={false}
        />
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      recentlyAddedVideos: [],
    },
  };
}
