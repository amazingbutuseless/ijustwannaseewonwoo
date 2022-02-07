import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';

import i18n from 'config/i18n';
import theme from './theme';
import Layout from 'components/Layout';
import PlayerPreference from 'contexts/PlayerPreference';

import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  i18n.changeLanguage(locale);

  return (
    <ThemeProvider theme={theme}>
      <SWRConfig value={{ errorRetryCount: 0 }}>
        <Layout>
          <PlayerPreference>
            <Component {...pageProps} />
          </PlayerPreference>
        </Layout>
      </SWRConfig>
    </ThemeProvider>
  );
}

export default MyApp;
