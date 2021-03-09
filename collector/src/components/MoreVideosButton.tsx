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
      <MoreVideosButtonWrapper onClick={onClick}>{`${current} / ${total}`}</MoreVideosButtonWrapper>
    </MoreButtonContainer>
  );
}
