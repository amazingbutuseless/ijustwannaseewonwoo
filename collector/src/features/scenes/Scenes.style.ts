import styled from '@emotion/styled';

interface ISceneListProps {
  activeItemIdx: number;
}

export const SceneWrapper = styled.div`
  margin-top: 1.6rem;
  overflow: hidden;
`;

export const SceneList = styled.ul<ISceneListProps>`
  list-style: none;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  overflow: auto;

  li:nth-of-type(${({ activeItemIdx }) => activeItemIdx + 1}) {
    border-color: var(--dark-orchid);
  }

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

export const AddSceneButton = styled.button`
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

AddSceneButton.defaultProps = {
  type: 'button',
};

export const LoadingAnimation = styled.div`
  margin-bottom: 1.6rem;
  max-width: 50%;
  font-size: 3.2rem;
  color: #fff;
  word-break: keep-all;
`;
