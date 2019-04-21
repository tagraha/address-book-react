/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { usersMock } from './../../../../redux/initialStates';
import { loadUsers, ACTIONS } from '../../../../redux/modules/users';
import PageHome from '../PageHome';

describe('should render <PageHome /> correctly', async () => {
  test('renders', () => {
    const middlewares = [thunk.withExtraArgument({ mockAxios })];
    const mockStore = configureStore(middlewares);
    const store = mockStore({users: usersMock});

    // mockAxios.get.mockImplementationOnce(() =>
    //   Promise.resolve(store),
    // );

    const expectedActions = [
      { type: ACTIONS.FETCH_USERS },
      { type: ACTIONS.FETCH_USERS_SUCCESS, data: store },
    ]

    jest.mock('axios');
    // store.dispatch(loadUsers());
    // ASSERTIONS / EXPECTS
    // expect(store.getActions()).toEqual(expectedActions)
    const wrapper = shallow(<PageHome store={store} />);
    expect(wrapper).toMatchSnapshot();
  });
});
