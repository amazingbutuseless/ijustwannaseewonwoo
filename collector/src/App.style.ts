import styled from '@emotion/styled';

export const ContentsWrapper = styled.div`
  display: flex;
  align-items: stretch;
  position: relative;
  margin-top: var(--titleBarHeight);
  height: calc(100vh - var(--titleBarHeight));
  overflow: hidden;
`;

export const Scrollbar = `
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: var(--rich-black-fogra-39);
}

::-webkit-scrollbar-thumb {
  border: 2px solid var(--rich-black-fogra-39);
  border-radius: 4px;
  background-color: var(--jet);
}
`;

export const Content = styled.div`
  position: relative;
  width: calc(100vw - 6.4rem);
  height: calc(100vh - var(--titleBarHeight));
`;
