import styled from '@emotion/styled';

import { PlaylistItemWrapper } from './PlaylistItem.style';

export const MenuTitle = styled.h2`
  display: inline-block;
  margin: 0;
  margin-bottom: 0.8rem;
  padding: 0;
  padding: 0.4rem;
  background-color: var(--rich-black-fogra-39);
  font-size: 2.4rem;
  color: #fff;
`;

export const PlaylistListItems = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
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
