import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { SWRConfig } from 'swr';
import { I18nextProvider } from 'react-i18next';

import i18n from 'config/i18n';
import theme from 'config/theme';
import Layout from 'components/Layout';
import Loading from 'components/Loading';
import PreferenceProvider from 'contexts/PreferenceContext';
import AuthProvider from 'contexts/AuthContext';

import 'styles/globals.css';

function DefaultConfigProvider({ children }: { children: React.ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <SWRConfig value={{ errorRetryCount: 0 }}>{children}</SWRConfig>
        </I18nextProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setLoading(true);
    });

    Router.events.on('routeChangeComplete', () => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DefaultConfigProvider>
        <AuthProvider>
          <PreferenceProvider>
            <Layout>
              <Component {...pageProps} />
              {loading && <Loading />}
            </Layout>
          </PreferenceProvider>
        </AuthProvider>
      </DefaultConfigProvider>
    </>
  );
}

export default App;
