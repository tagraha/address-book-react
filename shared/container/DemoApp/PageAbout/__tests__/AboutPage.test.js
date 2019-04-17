/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { shallow } from 'enzyme';

import AboutPage from '../AboutPage';

describe('should render <AboutPage /> page correctly', () => {
  test('renders', () => {
    const wrapper = shallow(<AboutPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
