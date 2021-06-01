import styled from '@emotion/styled';

import { Scrollbar } from '../../App.style';

import { VideoItemWrapper } from '../../components/VideoItem.style';

export const VideoListWrapper = styled.div`
  padding: 2.4rem 0;
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
