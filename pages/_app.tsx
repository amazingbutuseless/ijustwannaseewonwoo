import { useState } from 'react';
import type { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { SWRConfig } from 'swr';

import i18n from 'config/i18n';
import theme from 'config/theme';
import Layout from 'components/Layout';
import Loading from 'components/Loading';
import PreferenceProvider from 'contexts/PreferenceContext';
import SnackbarProvider from 'contexts/SnackbarContext';
import AuthProvider from 'contexts/AuthContext';

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
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <SWRConfig value={{ errorRetryCount: 0 }}>
            <AuthProvider>
              <Layout>
                <PreferenceProvider>
                  <SnackbarProvider>
                    <Component {...pageProps} />
                    {loading && <Loading />}
                  </SnackbarProvider>
                </PreferenceProvider>
              </Layout>
            </AuthProvider>
          </SWRConfig>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  );
}

export default MyApp;
