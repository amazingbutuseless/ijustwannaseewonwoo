import styled from '@emotion/styled';

export const PlaylistCover = styled.header`
  display: flex;
  align-items: center;
  margin-top: calc(-1 * var(--app-bar-height));
  min-height: 600px;
  background-image: url(attr(data-cover));
  background-size: cover;

  h2 {
    margin-bottom: 1rem;
    font-size: 3.2rem;
    font-weight: 700;
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
