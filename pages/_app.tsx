import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material';

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
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
