import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@material-ui/core';

import i18n from '../i18n';
import theme from './theme';
import './global.css';

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  i18n.changeLanguage(locale);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
