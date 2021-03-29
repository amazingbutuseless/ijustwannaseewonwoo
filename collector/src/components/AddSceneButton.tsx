import React, { ReactElement } from 'react';

import { AddSceneButtonWrapper } from './AddSceneButton.style';

import AddSceneIcon from './AddSceneIcon';

interface AddSceneButtonProps {
  onClick: () => void;
  enable: boolean;
}

export default function AddSceneButton({ onClick, enable }: AddSceneButtonProps): ReactElement {
  return (
    <AddSceneButtonWrapper onClick={onClick} disabled={!enable}>
      <AddSceneIcon />
      <span>장면 추가</span>
    </AddSceneButtonWrapper>
  );
}
