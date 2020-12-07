import React from 'react';

import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Logo from './index';

describe('Logo', () => {
  it('have to be rendered', () => {
    const logo = shallow(<Logo />);
    expect(toJson(logo)).toMatchSnapshot();
  });
});
