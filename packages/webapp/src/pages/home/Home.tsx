import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

import Layout from 'src/components/Layout';

export default function Home() {
  const { t } = useTranslation(['common', 'home']);

  return (
    <Layout>
      <Head>
        <title>{t('home:title')} - ijustwannasee</title>
      </Head>
      <section>
        <Typography variant="h2">Playlists</Typography>
      </section>
      <section>
        <Typography variant="h2">Videos</Typography>
      </section>
    </Layout>
  );
}
