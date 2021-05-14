import styled from '@emotion/styled';

import { Scrollbar } from '../../App.style';

import { VideoItemWrapper } from '../../components/VideoItem.style';

export const VideoListWrapper = styled.div`
  padding: 2.4rem 0;
  height: calc(100vh - var(--titleBarHeight));
  box-sizing: border-box;
  overflow: auto;

  ${Scrollbar}
`;

export const VideoItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${VideoItemWrapper} {
    width: calc(100% / 5 - 3.2rem);
  }
`;
