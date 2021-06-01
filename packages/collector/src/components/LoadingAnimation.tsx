import React from 'react';

import { LoadingAnimationWrapper } from './LoadingAnimation.style';

export default function LoadingAnimation() {
  const start = Math.floor(Math.random() * 28);

  return (
    <LoadingAnimationWrapper autoPlay loop muted width="160" height="160">
      <source src={`static:///assets/images/loading.mp4#t=${start}`} />
    </LoadingAnimationWrapper>
  );
}
