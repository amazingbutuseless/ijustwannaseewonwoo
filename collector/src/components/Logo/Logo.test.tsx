import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

import Logo from './index';

describe('Logo', () => {
  it('have to be rendered', () => {
    const logo = shallow(<Logo />);
    expect(toJson(logo)).toMatchSnapshot();
  });
});
