import React from 'react';

import { LoadingAnimationWrapper } from './LoadingAnimation.style';

export default function LoadingAnimation({ message = 'ijustwannaseewonwoo' }) {
  return <LoadingAnimationWrapper>{message}</LoadingAnimationWrapper>;
}
