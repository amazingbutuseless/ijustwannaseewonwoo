import styled from '@emotion/styled';

import { SceneAddFormCloseButtonWrapper } from '../../components/SceneAddFormCloseButton.style';

interface ISceneAddFormWrapperStyleProps {
  visible: boolean;
}

export const SceneAddFormContainer = styled.form<ISceneAddFormWrapperStyleProps>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  right: 1.6rem;
  bottom: 5.6rem;
  padding: 1.6rem;
  border-radius: var(--borderRadius);
  background-color: var(--rich-black-fogra-39);
  color: var(--silver-chalice);

  button:not(${SceneAddFormCloseButtonWrapper}) {
    margin-left: 1.6rem;
    padding: 0.8rem 1.6rem;

    border: 1px solid var(--dark-orchid);
    border-radius: 2px;
    background-color: rgba(158, 78, 221, 0);

    color: var(--dark-orchid);

    transition: background-color 200ms;

    &:hover {
      background-color: rgba(158, 78, 221, 1);

      color: var(--rich-black-fogra-39);
    }
  }
`;
