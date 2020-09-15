import { userConstants } from '../_constants';

const INITIAL_STATE = {};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // GET_USER_SESSION
    case userConstants.GET_USER_SESSION: {
      return {
        ...state,
        getUserSessionLoading: true,
        getUserSessionError: null,
        historyStories: null,
        ratedStories: null,
      };
    }

    case userConstants.GET_USER_SESSION_SUCCESS: {
      const { historyStories = [], ratedStories = [], _id } = action.data;

      if (_id) {
        localStorage.setItem('SSID', _id);
      }

      return {
        ...state,
        getUserSessionLoading: false,
        historyStories,
        ratedStories,
      };
    }

    case userConstants.GET_USER_SESSION_FAILURE: {
      return {
        ...state,
        getUserSessionLoading: false,
        getUserSessionError: action.error,
      };
    }

    default:
      return state;
  }
}
