import React, { ReactElement } from 'react';

import { MoreVideosButtonWrapper, MoreButtonContainer } from './MoreVideosButton.style';

interface MoreVideosButtonProps {
  current: number;
  total: number;
  onClick: () => void;
}

export default function MoreVideosButton({
  current,
  total,
  onClick,
}: MoreVideosButtonProps): ReactElement {
  return (
    <MoreButtonContainer>
      <MoreVideosButtonWrapper onClick={onClick}>
        {total > 0 && `${current} / ${total}`}
        {total < 1 && 'Loading...'}
      </MoreVideosButtonWrapper>
    </MoreButtonContainer>
  );
}
