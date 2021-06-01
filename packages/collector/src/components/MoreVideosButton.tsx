import React, { ReactElement } from 'react';

import { MoreVideosButtonWrapper, MoreButtonContainer } from './MoreVideosButton.style';

interface MoreVideosButtonProps {
  children: ReactElement | string;
  onClick: () => void;
}

export default function MoreVideosButton({
  children,
  onClick,
}: MoreVideosButtonProps): ReactElement {
  return (
    <MoreButtonContainer>
      <MoreVideosButtonWrapper onClick={onClick}>{children}</MoreVideosButtonWrapper>
    </MoreButtonContainer>
  );
}
