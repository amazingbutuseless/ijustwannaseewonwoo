import styled from '@emotion/styled';

import { VideoItemWrapper } from './VideoItem.style';

export const PlaylistVideoListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;

  ${VideoItemWrapper} {
    width: calc(100% / 4 - 3.2rem);
  }
`;
