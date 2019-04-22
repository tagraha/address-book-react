/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { usersMock } from '../../../../redux/initialStates';
import { loadUsers, ACTIONS } from '../../../../redux/modules/users';
import PageHome from '../PageHome';

const middlewares = [thunk.withExtraArgument({ axios })];
const mockStore = configureMockStore(middlewares);
const store = mockStore({users: usersMock});

describe('should render <PageHome /> correctly', () => {
  test('renders', () => {
    const wrapper = shallow(<PageHome store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('it should dispatch action correctly when load the users', () => {
    const expectedActions = [
      { type: ACTIONS.FETCH_USERS },
      { type: ACTIONS.FETCH_USERS_SUCCESS, payload: {} },
    ]
    store.dispatch(loadUsers()).then((args) => {
      console.log('args');
      // ASSERTIONS / EXPECTS
      expect(store.getActions()).toEqual(expectedActions)
    });
  });
});
