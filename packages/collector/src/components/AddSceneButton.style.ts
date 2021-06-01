import styled from '@emotion/styled';

export const AddSceneButtonWrapper = styled.button`
  position: fixed;
  bottom: 3.2rem;
  right: 2.4rem;
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 3.2rem;
  border: 0;
  background-color: var(--dark-orchid);
  box-shadow: var(--boxShadow);
  outline: none;
  cursor: pointer;

  span {
    display: none;
  }

  &[disabled] {
    background-color: var(--battleship-grey);
    cursor: default;
  }
`;

AddSceneButtonWrapper.defaultProps = {
  type: 'button',
};
