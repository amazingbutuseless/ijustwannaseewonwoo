import styled from '@emotion/styled';

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;

  padding: 1.6rem;
  width: 100vw;
  background: rgb(18, 18, 18);
  background: linear-gradient(
    180deg,
    rgba(18, 18, 18, 1) 0%,
    rgba(18, 18, 18, 0.75) 65%,
    rgba(18, 18, 18, 0) 100%
  );
  box-sizing: border-box;

  z-index: 3;

  h1 {
    margin: 0 auto;
    text-align: center;
  }

  a {
    font-size: 2.4rem;
    font-weight: bold;
    color: var(--pumpkin);
    text-decoration: none;
  }
`;
