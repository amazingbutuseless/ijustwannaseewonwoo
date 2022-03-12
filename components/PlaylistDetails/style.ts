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
  }

  a {
    display: inline-block;
    margin-top: 1.6rem;
    padding: 1.6rem 2.4rem;
    border-radius: 2px;
    background-color: #000;
    font-size: 1.4rem;
    color: #fff;
    text-decoration: none;
  }

  @media (orientation: portrait) {
    background-image: url("${({portrait}) => portrait}");
  }

  @media (min-width: 768px) {
    h2 {
      font-size: 4.8rem;
    }
  }

  @media (min-width: 1024px) {
    min-height: 48rem;
  }
`;
