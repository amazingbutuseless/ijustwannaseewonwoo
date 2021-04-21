import styled from '@emotion/styled';

export interface MenuItemWrapperProps {
  active: boolean;
}

export const MenuWrapper = styled.nav`
  background-color: var(--eerie-black);
`;

export const MenuItemWrapper = styled.a<MenuItemWrapperProps>`
  display: block;
  padding: 1.2rem;
  border-left: 4px solid ${({ active }) => (active ? 'var(--dark-orchid)' : 'transparent')};
  box-sizing: border-box;

  svg {
    width: 3.6rem;
    height: 3.6rem;
    fill: var(${({ active }) => (active ? '--dark-orchid' : '--silver-chalice')});
  }

  span {
    display: none;
  }
`;
