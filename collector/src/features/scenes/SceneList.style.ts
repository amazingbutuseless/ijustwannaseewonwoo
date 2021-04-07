import styled from '@emotion/styled';

interface ISceneListProps {
  activeItemIdx: number;
}

export const Wrapper = styled.div``;

export const List = styled.ul<ISceneListProps>`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

export const LoadingAnimation = styled.div`
  margin-bottom: 1.6rem;
  max-width: 50%;
  font-size: 3.2rem;
  color: #fff;
  word-break: keep-all;
`;
