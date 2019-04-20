// users.js
import { usersMock } from './../initialStates';

// Actions
export const ACTIONS = {
  CHANGE_NATIONALITIES_CONFIG: 'users/CHANGE_NATIONALITIES_CONFIG',
  FETCH_USERS: 'users/FETCH_USERS',
  FETCH_USERS_SUCCESS: 'users/FETCH_USERS_SUCCESS',
  FETCH_USERS_SUCCESS: 'users/FETCH_USERS_SUCCESS',
  INIT_USERS: 'users/INIT_USERS',
}

/**
 * Helper function to calculate fetched users data
 * @constructor
 * @param {string} current - The number of the current fetched users data.
 * @param {string} addition - The number of new fetched users data count.
 */
function countFetchedData(current, addition) {
  return parseInt(current + addition)
}

/**
 * Helper function to sanitize countries param
 */
function getCountriesParams(natConfig = null) {
  if (!natConfig) {
    /** early return if no natConfig args **/
    return '';
  }

  const arr = [];
  natConfig.map((value) => {
    if (value.isChecked) {
      arr.push(value.countryCode);
    }
  })

  const urlParam = arr.length > 0 ? '&nat=' + arr.join(',') : '';
  return urlParam;
}

// Reducer
// DUCKS: https://github.com/erikras/ducks-modular-redux
export default function reducer(state = usersMock, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case ACTIONS.CHANGE_NATIONALITIES_CONFIG: {
      const nationalitiesConfig = [...state.config.nationalities];
      const configIndex = nationalitiesConfig.findIndex(val => val.countryCode === action.payload.countryCode);
      nationalitiesConfig[configIndex].isChecked = action.payload.isChecked;
      return {
        ...state,
        config: {
          nationalities: nationalitiesConfig,
        }
      };
    }
    case ACTIONS.FETCH_USERS: {
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
    case ACTIONS.FETCH_USERS_SUCCESS: {
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
    case ACTIONS.FETCH_USERS_FAILED: {
      return {
        ...state,
        data: {
          ...state.data,
          isLoading: false,
          isError: true,
        }
      };
    }
    case ACTIONS.INIT_USERS: {
      return {
        ...state,
        page: action.payload.info.page,
        data: {
          ...state.data,
          isError: false,
          isLoading: false,
          info: action.payload.info,
          results: action.payload.results,
          fetchedCount: action.payload.info.results,
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
  return { type: ACTIONS.FETCH_USERS };
}

function fetchUsersSuccess(users) {
  return { type: ACTIONS.FETCH_USERS_SUCCESS, payload: users };
}

function fetchUsersFailed(err) {
  return { type: ACTIONS.FETCH_USERS_FAILED, payload: err.message };
}

function changeNationalitiesConfig(config) {
  return { type: ACTIONS.CHANGE_NATIONALITIES_CONFIG, payload: config }
}

function loadInitUsers(users) {
  return { type: ACTIONS.INIT_USERS, payload: users };
}

// side effects, only as applicable
// e.g. thunks, epics, etc

/**
 * Action creator for load more users list
 */
export const loadUsers = (results = 50) => (dispatch, getState, { axios }) => {
  dispatch(fetchUsers());
  // set current pagination state tree
  const pagination = parseInt(getState().users.page);

  const natConfig = getState().users.config.nationalities;

  const natParams = getCountriesParams(natConfig);

  return (
    axios
      .get(`https://randomuser.me/api/?page=${pagination+1}&results=${results}&seed=tirta${natParams}`)
      .then((res) => {
        dispatch(fetchUsersSuccess(res.data));
      })
      // eslint-disable-next-line
      .catch((err) => {
        dispatch(fetchUsersFailed(err));
      })
  );
}

/**
 * Action creator for loading the initial users list
 * it takes no args. the url's hardcoded except
 * natinality url query. this action will trigerred on
 * home page initial load & Nationality checkbox changed
 * on the setting page
 */
export const loadInitialUsers = () => (dispatch, getState, { axios }) => {
  const natConfig = getState().users.config.nationalities;
  const natParams = getCountriesParams(natConfig);

  return (
    axios
      .get(`https://randomuser.me/api/?page=0&results=50&seed=tirta${natParams}`)
      .then((res) => {
        dispatch(loadInitUsers(res.data));
      })
      // eslint-disable-next-line
      .catch((err) => {
        dispatch(fetchUsersFailed(err));
      })
  );
}

/**
 * Action creator for handle checkbox on setting page
 * @param {string} countryCode - The string (2 char) of the contry code. ex: US or AU.
 * @param {boolean} isChecked - The state of checkbox checked regarding to countryCode param.
 */

export const onNationalitiesChange = (countryCode = null, isChecked = null) => (dispatch, getState) => {
  const config = {
    countryCode: countryCode,
    isChecked: isChecked,
  }
  return dispatch(changeNationalitiesConfig(config));
}