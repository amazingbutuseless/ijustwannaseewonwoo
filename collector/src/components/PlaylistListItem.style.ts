import { css } from '@emotion/react';
import styled from '@emotion/styled';

export interface PlaylistListItemTitleProps {
  active: boolean;
}

export const ChannelInfo = styled.div`
  display: flex;
  align-items: center;

  margin-top: 0.8rem;

  font-size: 1.2rem;

  img {
    display: inline-block;
    margin-right: 0.8rem;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 1.2rem;
  }
`;

export const Title = styled.span<PlaylistListItemTitleProps>`
  color: var(${({ active }) => (active ? '--dark-orchid' : '--silver-chalice')});
`;

export const PlaylistListItemWrapper = styled.li`
  margin: 0.8rem;
  margin-left: 0;
  padding: 1.6rem;
  box-sizing: border-box;

  border: 1px solid var(--jet);
  border-radius: var(--borderRadius);

  font-size: 1.4rem;
  color: var(--silver-chalice);

  cursor: pointer;
`;
