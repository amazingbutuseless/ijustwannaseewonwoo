import styled from '@emotion/styled';

interface ISceneListProps {
  activeItemIdx: number;
}

export const SceneWrapper = styled.div`
  margin: 1.6rem 0;
  overflow: hidden;
`;

export const SceneList = styled.ul<ISceneListProps>`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-bottom: 2.4rem;
  white-space: nowrap;
  overflow: auto;

  li:nth-of-type(${({ activeItemIdx }) => activeItemIdx + 1}) {
    border-color: var(--dark-orchid);
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
  background-color: var(--russian-violet);
  box-shadow: var(--boxShadow);
  outline: none;
  cursor: pointer;

  span {
    display: none;
  }
`;

AddSceneButton.defaultProps = {
  type: 'button',
};
