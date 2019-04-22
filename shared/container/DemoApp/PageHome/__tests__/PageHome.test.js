/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { usersMock } from '../../../../redux/initialStates';
import { loadUsers, onFilterChange, ACTIONS } from '../../../../redux/modules/users';
import PageHome from '../PageHome';

const middlewares = [thunk.withExtraArgument({ axios })];
const mockStore = configureMockStore(middlewares);

describe('should render <PageHome /> correctly', () => {
  const store = mockStore({users: usersMock});
  test('renders', () => {
    const wrapper = shallow(<PageHome store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('it should dispatch action correctly when load the users', () => {
    const expectedActions = [
      { type: ACTIONS.FETCH_USERS },
      { type: ACTIONS.FETCH_USERS_SUCCESS, payload: {} },
    ]
    store.dispatch(loadUsers()).then(() => {
      // ASSERTIONS / EXPECTS
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  test('it should dispatch action correctly when onFilterChange', () => {
    const store = mockStore({users: usersMock});
    const expectedOnFilterChangeAction = [
      { type: ACTIONS.APPLY_FILTER, payload: {filterKeyword: '', filteredResults: []} }
    ];

    store.dispatch(onFilterChange());
    expect(store.getActions()).toEqual(expectedOnFilterChangeAction);
  });
});
