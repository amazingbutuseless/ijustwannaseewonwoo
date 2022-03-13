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
