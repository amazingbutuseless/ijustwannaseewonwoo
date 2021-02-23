import styled from '@emotion/styled';

export const DrawerUserMenuWrapper = styled.div`
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
`;
