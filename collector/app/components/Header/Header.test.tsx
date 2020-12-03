import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Header from './index';

configure({ adapter: new Adapter() });

describe('Header', () => {
  it('have a proper title', () => {
    const title = 'test';
    const header = shallow(<Header title={title} />);
    expect(toJson(header)).toMatchSnapshot();
  });
});
