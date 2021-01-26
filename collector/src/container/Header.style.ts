import styled from '@emotion/styled';

export const BackButton = styled.a`
  position: absolute;
  text-decoration: none;

  path {
    fill: var(--pumpkin);
  }
`;

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;

  padding: 1.6rem;
  width: 100vw;
  background: rgb(35, 35, 35);
  background: linear-gradient(
    180deg,
    rgba(35, 35, 35, 1) 0%,
    rgba(35, 35, 35, 0.8) 65%,
    rgba(35, 35, 35, 0) 100%
  );
  box-sizing: border-box;

  z-index: 3;

  h2 {
    display: inline-block;
    margin: 0;
    margin-left: 3.2rem;
    padding: 0;
    color: var(--pumpkin);
  }
`;
