import styled from '@emotion/styled';

import { Scrollbar } from '../../App.style';

export const PlaylistContainer = styled.div`
  display: flex;
  align-content: flex-start;

  position: relative;
  overflow: hidden;

  & > * {
    height: calc(100vh - var(--titleBarHeight));
    box-sizing: border-box;
  }
`;

export const PlaylistListWrapper = styled.div`
  width: 16rem;
  background-color: var(--eerie-black);
`;

export const PlaylistVideosWrapper = styled.div`
  justify-self: flex-end;

  padding: 2.4rem 0;
  width: calc(100% - 16rem);

  overflow: auto;

  ${Scrollbar}
`;
