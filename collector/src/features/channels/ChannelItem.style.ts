import styled from '@emotion/styled';

import { ChannelItemThumbnails } from '../../types';

interface ChannelItemButtonStyleProps {
  thumbnails: ChannelItemThumbnails;
}

export const ChannelButton = styled.button`
  display: block;

  position: relative;

  width: 6.4rem;
  height: 6.4rem;

  border: 4px solid transparent;
  border-radius: 12.8rem;
  background-image: url(${({ thumbnails }: ChannelItemButtonStyleProps) => thumbnails.default});
  background-size: cover;
  box-sizing: border-box;

  cursor: pointer;

  span {
    display: none;
  }

  &:focus,
  &:hover {
    border-color: var(--heat-wave);
    outline: none;

    &:after {
      position: absolute;
      left: calc(100% + 6px);
      top: 50%;
      padding: 0.8rem;
      border-radius: 4px;
      background-color: var(--eerie-black);
      transform: translateY(-50%);
      color: var(--heat-wave);
      content: attr(aria-label);
    }
  }
`;
