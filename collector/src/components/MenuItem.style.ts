import styled from '@emotion/styled';

export interface MenuItemWrapperProps {
  active: boolean;
  forSubMenu?: boolean;
}

const MENU_ICON_SIZE = '3.6rem';
const SUB_MENU_ICON_SIZE = '1.6rem';

const SubMenuItemWrapperStyle = `
  display: flex;
  place-content: center;
`;

export const MenuItemWrapper = styled.a<MenuItemWrapperProps>`
  display: block;
  padding: 1.2rem;
  border-left: 4px solid ${({ active }) => (active ? 'var(--dark-orchid)' : 'transparent')};
  box-sizing: border-box;
  cursor: pointer;

  ${({ forSubMenu }) => forSubMenu && SubMenuItemWrapperStyle}

  svg {
    width: ${({ forSubMenu }) => (forSubMenu ? SUB_MENU_ICON_SIZE : MENU_ICON_SIZE)};
    height: ${({ forSubMenu }) => (forSubMenu ? SUB_MENU_ICON_SIZE : MENU_ICON_SIZE)};
    fill: var(${({ active }) => (active ? '--dark-orchid' : '--silver-chalice')});
  }

  span {
    display: none;
  }
`;
