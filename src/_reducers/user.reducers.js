import { userConstants } from '../_constants';

const INITIAL_STATE = {};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // LOGIN
    case userConstants.LOGIN: {
      return {
        ...state,
        loginLoading: true,
        loginError: null,
        loginSuccess: false,
        currentUser: null,
      };
    }
    case userConstants.LOGIN_SUCCESS: {
      return {
        ...state,
        loginLoading: false,
        loginSuccess: true,
        currentUser: action.data,
      };
    }

    case userConstants.LOGIN_FAILURE: {
      return {
        ...state,
        loginLoading: false,
        loginError: action.error,
      };
    }

    // REGISTER
    case userConstants.REGISTER: {
      return {
        ...state,
        registerLoading: true,
        registerError: null,
      };
    }

    case userConstants.REGISTER_SUCCESS: {
      return {
        ...state,
        registerLoading: false,
        currentUser: action.data,
      };
    }

    case userConstants.REGISTER_FAILURE: {
      return {
        ...state,
        registerLoading: false,
        registerError: action.error,
      };
    }

    // get user info
    case userConstants.GET_USER_INFO: {
      return {
        ...state,
        getUserInfoLoading: true,
        getUserInfoError: null,
      };
    }

    case userConstants.GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        getUserInfoLoading: false,
        currentUser: action.data,
      };
    }

    case userConstants.GET_USER_INFO_FAILURE: {
      return {
        ...state,
        getUserInfoLoading: false,
        getUserInfoError: action.error,
      };
    }

    default:
      return state;
  }
}
