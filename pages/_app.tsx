import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';

import i18n from 'config/i18n';
import theme from './theme';
import Layout from 'components/Layout';

import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  i18n.changeLanguage(locale);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SWRConfig value={{ errorRetryCount: 0 }}>
          <Component {...pageProps} />
        </SWRConfig>
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
