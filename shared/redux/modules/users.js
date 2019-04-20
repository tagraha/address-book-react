// users.js
import { usersMock } from './../initialStates';

// Actions
const FETCH_USERS = 'users/FETCH_USERS';
const FETCH_USERS_SUCCESS = 'users/FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILED = 'users/FETCH_USERS_FAILED';

/**
 * Helper function to calculate fetched users data
 * @constructor
 * @param {string} current - The number of the current fetched users data.
 * @param {string} addition - The number of new fetched users data count.
 */
function countFetchedData(current, addition) {
  return parseInt(current + addition)
}

// Reducer
// DUCKS: https://github.com/erikras/ducks-modular-redux
export default function reducer(state = usersMock, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case FETCH_USERS: {
      return {
        ...state,
        data: {
          // only change isLoading data object key
          // the rest object key is not affected
          ...state.data,
          isLoading: true,
        }
      };
    }
    case FETCH_USERS_SUCCESS: {
      // get the current users data array on redux state tree
      const prevUsersData = state.data.results;
      // fresh fetched users data from API
      const fetchedData = action.payload.results;
      // combine the users data
      const usersData = prevUsersData.concat(fetchedData);

      return {
        ...state,
        page: action.payload.info.page,
        data: {
          ...state.data,
          isError: false,
          isLoading: false,
          info: action.payload.info,
          results: usersData,
          fetchedCount: countFetchedData(state.data.fetchedCount, action.payload.info.results),
        }
      };
    }
    case FETCH_USERS_FAILED: {
      return {
        ...state,
        data: {
          ...state.data,
          isLoading: false,
          isError: true,
        }
      };
    }
    default: {
      return state;
    }
  }
}

// Action Creators
function fetchUsers() {
  return { type: FETCH_USERS };
}

function fetchUsersSuccess(users) {
  return { type: FETCH_USERS_SUCCESS, payload: users };
}

function fetchUsersFailed(err) {
  return { type: FETCH_USERS_FAILED, payload: err.message };
}

// side effects, only as applicable
// e.g. thunks, epics, etc
export const loadUsers = (results = 50) => (dispatch, getState, { axios }) => {
  dispatch(fetchUsers());
  // set current pagination state tree
  const pagination = parseInt(getState().users.page);
  return (
    axios
      .get(`https://randomuser.me/api/?page=${pagination+1}&results=${results}&seed=tirta`)
      .then((res) => {
        dispatch(fetchUsersSuccess(res.data));
      })
      // eslint-disable-next-line
      .catch((err) => {
        dispatch(fetchUsersFailed(err));
      })
  );
}
