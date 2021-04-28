import styled from '@emotion/styled';

import { Scrollbar } from '../../App.style';

export const VideoWrapper = styled.div`
  display: flex;
  overflow: hidden;
`;

export const ScenesWrapper = styled.div`
  width: 18.4rem;
  height: calc(100vh - var(--titleBarHeight));
  overflow: auto;

  ${Scrollbar}
`;

export const VideoDownloadingMessage = styled.p`
  margin: 0;
  padding: 1.6rem;
  font-size: 1.4rem;
  color: var(--silver-chalice);
`;
