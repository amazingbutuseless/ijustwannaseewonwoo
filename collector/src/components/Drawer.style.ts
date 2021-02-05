import styled from '@emotion/styled';

import { IDrawerStyleProps } from '../types';

export const DrawerBackground = styled.div<IDrawerStyleProps>`
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

export const DrawerWrapper = styled.nav<IDrawerStyleProps>`
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

  button {
    padding: 0;
    border: 0;
    background-color: transparent;
    color: var(--silver-chalice);
    outline: none;
    cursor: pointer;
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  li a {
    display: inline-block;
    position: relative;
    margin-bottom: 0.4rem;
    padding: 0.8rem 0;
    border-bottom: 2px solid transparent;
    overflow: hidden;

    &:before {
      position: absolute;
      bottom: 0.2rem;
      width: 100%;
      height: 4px;
      background-color: #fff;
      transform: translateX(calc(-100%));
      transition: transform 100ms;
      content: '';
    }

    &:hover:before {
      transform: translateX(0);
    }
  }

  & > button {
    align-self: flex-end;

    span {
      display: none;
    }
  }

  & > div:last-child {
    position: relative;
    margin-top: 2.4rem;
    padding-top: 2.4rem;
    font-size: 1.2rem;

    button {
      margin-left: 0.8rem;
    }

    &:before {
      position: absolute;
      top: 0;
      width: 4rem;
      height: 1px;
      background-color: #fff;
      content: '';
    }
  }
`;
