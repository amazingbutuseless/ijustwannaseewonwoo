import { useRouter } from 'next/router';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

function AfterSignIn() {
  const router = useRouter();

  useEffect(() => {
    const redirect = window.sessionStorage.getItem('redirect');
    window.sessionStorage.removeItem('redirect');
    router.replace((redirect as string) || '/');
  }, []);

  return <></>;
}

export default dynamic(() => Promise.resolve(AfterSignIn), { ssr: false });
