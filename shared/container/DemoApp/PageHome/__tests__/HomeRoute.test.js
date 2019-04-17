/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { shallow } from 'enzyme';

import PageHome from '../PageHome';

describe('should render <PageHome /> correctly', () => {
  test('renders', () => {
    const wrapper = shallow(<PageHome />);
    expect(wrapper).toMatchSnapshot();
  });
});
