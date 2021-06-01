import React from 'react';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ChannelItem from '../ChannelItem';

const onClick = jest.fn();

function render() {
  const thumbnails = {
    default: 'thumbnail-default.png',
    high: 'thumbnail-high.png',
  };

  return shallow(
    <ChannelItem id="testid" title="Test Channel" thumbnails={thumbnails} onClick={onClick} />
  );
}

beforeEach(() => {
  onClick.mockClear();
});

describe('ChannelItem', () => {
  it('must be rendered', () => {
    const item = render();

    expect(toJson(item)).toMatchSnapshot();
  });

  it('onClick fires when the item is clicked', () => {
    const item = render();

    item.simulate('click');
    expect(onClick).toBeCalledWith('testid');
  });
});
