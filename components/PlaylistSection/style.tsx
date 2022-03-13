import styled from '@emotion/styled';

export const Wrapper = styled.section`
  & > h2 {
    margin: 0;
    padding: 0;
    text-indent: -1000rem;
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
