import styled from '@emotion/styled';

interface PlaylistCoverProps {
  landscape: string;
  portrait: string;
}

export const PlaylistCover = styled.header<PlaylistCoverProps>`
  display: flex;
  align-items: center;
  margin-top: calc(-1 * var(--app-bar-height));
  min-height: 600px;
  background-image: url("${({ landscape }) => landscape}");
  background-size: cover;

  h2,
  h3 {
    margin-bottom: 1rem;
    font-size: 3.2rem;
    font-weight: 700;
    color: var(--title-color, --playlist-title-color);
  }
  
  p {
    color: var(--description-color, --playlist-description-color);
  }

  @media (orientation: portrait) {
    background-image: url("${({portrait}) => portrait}");
  }

  @media (min-width: 768px) {
    min-height: 48rem;

    h2, h3 {
      font-size: 4.8rem;
    }
  }
`;

export const GoButtonFace = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.6rem;
  padding: 1.6rem 2.4rem;
  min-width: 12rem;
  box-sizing: border-box;
  border: 2px solid var(--title-color, --playlist-title-color);
  border-radius: 2px;
  font-size: 1.4rem;
  color: var(--title-color, --playlist-title-color);
  font-weight: bold;
  text-decoration: none;
  transition: transform 0.2s linear;

  path {
    fill: var(--title-color, --playlist-title-color);
  }

  &:hover svg {
    transform: translateX(1rem);
  }
`;
