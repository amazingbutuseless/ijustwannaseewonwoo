import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { matchers } from '@emotion/jest';

import Menu, { MenuProps, isActive } from '../Menu';
import MenuItem, { MenuItemProps } from '../MenuItem';

expect.extend(matchers);

function renderMenuComponent({ activeItem, onItemClick, onSignOutButtonClick }: MenuProps) {
  return render(
    <Menu
      activeItem={activeItem}
      onItemClick={onItemClick}
      onSignOutButtonClick={onSignOutButtonClick}
    />
  );
}

function renderMenuItemComponent({ title, active, onClick, children }: MenuItemProps) {
  return render(
    <MenuItem title={title} active={active} onClick={onClick}>
      {children}
    </MenuItem>
  );
}

describe('Menu', () => {
  const activeItem = 'Playlist';

  describe('Rendering', () => {
    it('menu must be in the document', () => {
      const container = renderMenuComponent({
        activeItem,
        onItemClick: (menuTitle: string) => {},
        onSignOutButtonClick: () => {},
      }).container;

      expect(container.querySelector('nav')).toBeInTheDocument();
      expect(container.querySelectorAll('a').length).toEqual(2);
    });

    it('active menu must be set properly', () => {
      const playlist = 'Playlist';
      const video = 'Video';

      expect(isActive(playlist, 'Playlist')).toEqual(true);
      expect(isActive(playlist, 'Video')).toEqual(false);
      expect(isActive(video, 'Playlist')).toEqual(false);
      expect(isActive(video, 'Video')).toEqual(true);
    });
  });
});

describe('MenuItem', () => {
  const title = 'test-menu-item';
  const children = <>test-menu-children</>;
  const onClick = jest.fn();

  describe('Rendering', () => {
    it('MenuItem must be in the document', () => {
      const { getByText } = renderMenuItemComponent({ title, children, onClick, active: false });

      expect(getByText(title)).toBeInTheDocument();
    });

    it('MenuItem must have its proper style (not active)', () => {
      const item = renderMenuItemComponent({
        title,
        children,
        onClick,
        active: false,
      }).container.querySelector('a');

      expect(item).toHaveStyleRule('border-left', '4px solid transparent');
    });

    it('MenuItem must have its proper style (active)', () => {
      const item = renderMenuItemComponent({
        title,
        children,
        onClick,
        active: true,
      }).container.querySelector('a');

      expect(item).toHaveStyleRule('border-left', '4px solid var(--dark-orchid)');
    });
  });

  describe('Event Handling', () => {
    it('onItemClick function must be invoked', () => {
      const container = renderMenuItemComponent({ title, children, onClick, active: false })
        .container;
      fireEvent.click(container.querySelector('a'));

      expect(onClick).toBeCalled();
    });
  });
});
