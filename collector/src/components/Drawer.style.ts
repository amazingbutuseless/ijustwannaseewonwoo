import styled from '@emotion/styled';

interface DrawerStyleProps {
  expanded: boolean;
}

export const DrawerBackground = styled.div<DrawerStyleProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;

  ${({ expanded }) =>
    expanded &&
    `
  width: 100vw;
  height: 100vw;
  background-color: rgba(0, 0, 0, .25);
  `}
`;

export const DrawerNavigation = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const DrawerWrapper = styled.nav<DrawerStyleProps>`
  display: flex;
  flex-direction: column;
  align-items: self-start;
  position: fixed;
  top: 0;
  left: 0;
  padding: 1.6rem;
  width: 28rem;
  height: 100vh;
  box-sizing: border-box;
  background-color: var(--persian-indigo);
  font-size: 1.6rem;
  color: #fff;
  z-index: 5;
  transform: translateX(calc(-100% + 6.4rem));
  transition: transform 200ms;

  ${({ expanded }) =>
    expanded &&
    `transform: translateX(0);
  box-shadow: var(--boxShadow);`}

  a {
    color: #fff;
    text-decoration: none;
  }

  button {
    padding: 0;
    border: 0;
    background-color: transparent;
    color: var(--silver-chalice);
    outline: none;
    cursor: pointer;
  }
`;
