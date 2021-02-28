import styled from '@emotion/styled';

import { PlaylistItemWrapper } from './PlaylistItem.style';

export const PlaylistListItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  ${PlaylistItemWrapper} {
    &:nth-child(odd) {
      margin-right: 0.8rem;
    }

    &:nth-child(even) {
      margin-left: 0.8rem;
    }
  }
`;

export const PlaylistListWrapper = styled.div``;
