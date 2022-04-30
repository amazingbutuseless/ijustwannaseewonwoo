import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import * as Styled from './style';

function Loading() {
  const start = Math.floor(Math.random() * 28);

  useEffect(() => {
    document.body.style.setProperty('overflow', 'hidden');

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  return (
    <>
      <Styled.Backdrop />
      <Styled.Wrapper>
        <video src={`/images/loading_web.mp4#t=${start}`} muted autoPlay loop />
      </Styled.Wrapper>
    </>
  );
}

export default dynamic(() => Promise.resolve(Loading), { ssr: false });
