import Head from 'next/head';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation(['common', 'home']);

  return (
    <>
      <Head>
        <title>{t('home:title')} - ijustwannasee</title>
      </Head>
    </>
  );
}
