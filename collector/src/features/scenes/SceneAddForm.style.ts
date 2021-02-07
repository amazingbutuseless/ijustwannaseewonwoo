import styled from '@emotion/styled';

interface ISceneAddFormWrapperStyleProps {
  visible: boolean;
}

export const TimeInput = styled.input`
  padding: 0.8rem 0;
  width: 2.4rem;
  border: 1px solid transparent;
  border-radius: 2px;
  background-color: transparent;
  color: var(--silver-chalice);
  text-align: center;

  &:focus {
    border: 1px solid var(--silver-chalice);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

TimeInput.defaultProps = {
  type: 'number',
  placeholder: '00',
  min: '0',
};

export const CloseButton = styled.button`
  position: absolute;
  top: -2.4rem;
  right: 0;
  border: 0;
  background-color: transparent;
  outline: none;
`;

CloseButton.defaultProps = {
  type: 'button',
};

export const SceneAddFormContainer = styled.form<ISceneAddFormWrapperStyleProps>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  right: 1.6rem;
  bottom: 5.6rem;
  padding: 1.6rem;
  border-radius: var(--borderRadius);
  background-color: var(--rich-black-fogra-39);
  color: var(--silver-chalice);

  button:not(${CloseButton}) {
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
