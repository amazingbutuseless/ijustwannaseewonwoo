import styled from '@emotion/styled';

interface SceneListProps {
  activeItemIdx: number;
}

export const Wrapper = styled.div``;

export const List = styled.ul<SceneListProps>`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 0;
`;
