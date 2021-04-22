import styled from '@emotion/styled';

export const ContentsWrapper = styled.div`
  display: flex;
  align-items: stretch;
  margin-top: var(--titleBarHeight);
  height: calc(100vh - var(--titleBarHeight));
  overflow: hidden;
`;

export const Content = styled.div`
  position: relative;
  width: calc(100vw - 6.4rem);
  height: calc(100vh - var(--titleBarHeight));
`;
