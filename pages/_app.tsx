import { useState } from 'react';
import type { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';

import i18n from 'config/i18n';
import theme from 'config/theme';
import Layout from 'components/Layout';
import PlayerPreference from 'contexts/PlayerPreference';
import SnackbarProvider from 'contexts/SnackbarContext';
import Loading from 'components/Loading';

import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  i18n.changeLanguage(locale);

  const [loading, setLoading] = useState(false);
  Router.events.on('routeChangeStart', () => {
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setLoading(false);
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <SWRConfig value={{ errorRetryCount: 0 }}>
          <Layout>
            <PlayerPreference>
              <SnackbarProvider>
                <Component {...pageProps} />
                {loading && <Loading />}
              </SnackbarProvider>
            </PlayerPreference>
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
