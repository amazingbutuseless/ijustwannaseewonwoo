import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import i18n from '../i18n';

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  i18n.changeLanguage(locale);

  return <Component {...pageProps} />;
}
