import styled from '@emotion/styled';

export const DrawerItemWrapper = styled.li`
  a {
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
`;
