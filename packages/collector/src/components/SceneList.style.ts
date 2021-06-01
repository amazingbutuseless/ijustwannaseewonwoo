import styled from '@emotion/styled';

interface SceneListProps {
  activeItemIdx: number;
}

export const Wrapper = styled.div``;

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  margin-bottom: 4.8rem;
  padding: 0;
`;
