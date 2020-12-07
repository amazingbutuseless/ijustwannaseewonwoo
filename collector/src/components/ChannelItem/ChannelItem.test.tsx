import React from 'react';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ChannelItem, { ChannelItemProps } from './index';

function render({ id, title, thumbnails, onClick }: ChannelItemProps) {
  return shallow(<ChannelItem id={id} title={title} thumbnails={thumbnails} onClick={onClick} />);
}

const onClick = jest.fn();

beforeEach(() => {
  onClick.mockClear();
});

describe('ChannelItem', () => {
  it('must be rendered', () => {
    const item = render({
      id: 'testid',
      title: 'Test Channel',
      thumbnails: {
        default: 'thumbnail-default.png',
        high: 'thumbnail-high.png',
      },
      onClick,
    });

    expect(toJson(item)).toMatchSnapshot();
  });

  it('onClick fires when the item is clicked', () => {
    const item = render({
      id: 'testid',
      title: 'Test Channel',
      thumbnails: {
        default: 'thumbnail-default.png',
        high: 'thumbnail-high.png',
      },
      onClick,
    });

    item.simulate('click');
    expect(onClick).toBeCalledWith('testid');
  });
});
