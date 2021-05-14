import styled from '@emotion/styled';

export interface PlayTypeSwitcherWrapperProps {
  playScenes: boolean;
}

export const PlayTypeLabel = styled.span`
  position: absolute;
  top: 50%;
  left: calc(100% + 0.8rem);
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: var(--silver-chalice);
  white-space: nowrap;
`;

export const PlayTypeSwitcherWrapper = styled.div<PlayTypeSwitcherWrapperProps>`
  position: relative;
  margin: 0.8rem;
  margin-top: 0;
  width: 4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  background-color: var(${({ playScenes }) => (playScenes ? '--dark-orchid' : '--silver-chalice')});
  cursor: pointer;

  input {
    display: none;
  }

  &:after {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    background-color: #fff;
    transform: translateX(${({ playScenes }) => (playScenes ? '1.5rem' : '0')});
    transition: transform 0.2s linear;
    content: '';
  }
`;
