import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AfterSignIn() {
  const router = useRouter();
  const {
    query: { redirect },
  } = router;

  useEffect(() => {
    router.replace((redirect as string) || '/');
  }, []);

  return <></>;
}
