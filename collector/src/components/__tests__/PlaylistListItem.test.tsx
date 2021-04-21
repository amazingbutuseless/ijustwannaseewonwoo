import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { matchers, createSerializer } from '@emotion/jest';

expect.extend(matchers);
expect.addSnapshotSerializer(createSerializer());

import PlaylistListItem, { PlaylistListItemProps } from '../PlaylistListItem';

function renderComponent({ playlist, active, onClick }: PlaylistListItemProps) {
  return render(<PlaylistListItem playlist={playlist} active={active} onClick={onClick} />);
}

describe('PlaylistListItem', () => {
  const playlist = {
    id: 'test-playlist-id',
    title: 'test-playlist-title',
    channel: {
      id: 'test-playlist-channel-id',
      title: 'test-playlist-channel-title',
      thumbnails: {
        medium: 'test-playlist-channel-thumbnail-image-url',
      },
    },
  };

  describe('Rendering', () => {
    it('the component must be in the document', () => {
      const { getByText, container } = renderComponent({
        playlist,
        active: true,
        onClick: () => {},
      });

      expect(getByText(playlist.title)).toBeInTheDocument();
      expect(container.querySelector('img')).toBeInTheDocument();
      expect(getByText(playlist.channel.title)).toBeInTheDocument();
    });

    it('the component must have proper styles (active)', () => {
      const container = renderComponent({
        playlist,
        active: true,
        onClick: () => {},
      }).container;
      const item = container.querySelector('li');

      expect(item.querySelector('span')).toHaveStyleRule('color', 'var(--dark-orchid)');
    });

    it('the component must have proper styles (inactive)', () => {
      const { getByText } = renderComponent({ playlist, active: false, onClick: () => {} });

      expect(getByText(playlist.title)).toHaveStyleRule('color', 'var(--silver-chalice)');
    });
  });

  describe('Event Handling', () => {
    it('onClick function must be invoked when click', () => {
      const onClick = jest.fn();

      const item = renderComponent({ playlist, active: false, onClick }).container.querySelector(
        'li'
      );

      fireEvent.click(item);

      expect(onClick).toBeCalledWith(playlist.id);
    });
  });
});
