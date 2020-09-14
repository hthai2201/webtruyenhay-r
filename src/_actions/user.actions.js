import { userConstants } from '../_constants';
import { userServices } from '../_services';

function login(email, password) {
  function request() {
    return { type: userConstants.LOGIN };
  }
  function success(data) {
    return { type: userConstants.LOGIN_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
  return dispatch => {
    dispatch(request());
    userServices.login(email, password).then(
      data => {
        localStorage.setItem('USER_TOKEN', data.token);
        localStorage.setItem('USER_ROLE', data.staff_role);
        dispatch(success(data));
      },
      error => {
        dispatch(failure(error));
      },
    );
  };
}

function register(firstName, email, password) {
  function request() {
    return { type: userConstants.REGISTER };
  }
  function success(data) {
    return { type: userConstants.REGISTER_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
  return dispatch => {
    dispatch(request());
    userServices.register(firstName, email, password).then(
      data => {
        localStorage.setItem('USER_TOKEN', data.token);
        localStorage.setItem('USER_ROLE', data.staff_role);
        dispatch(success(data));
      },
      error => {
        dispatch(failure(error));
      },
    );
  };
}

function getUserInfo() {
  function request() {
    return { type: userConstants.GET_USER_INFO };
  }
  function success(data) {
    return { type: userConstants.GET_USER_INFO_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.GET_USER_INFO_FAILURE, error };
  }
  return dispatch => {
    dispatch(request());
    userServices.getUserInfo().then(
      data => {
        localStorage.setItem('USER_ROLE', data.staff_role);
        dispatch(success(data));
      },
      error => {
        dispatch(failure(error));
      },
    );
  };
}

export const userActions = {
  login,
  register,
  getUserInfo,
};
