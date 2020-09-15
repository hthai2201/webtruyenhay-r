import { createActionStatus } from './createActionStatus';
import { userConstants } from '../_constants';
import { userServices } from '../_services';

function getUserSession(options) {
  const actionStatus = createActionStatus(userConstants.GET_USER_SESSION);
  return dispatch => {
    dispatch(actionStatus.request(options));
    userServices.getUserSession(options).then(
      data => {
        dispatch(actionStatus.success(data, options));
      },
      error => {
        dispatch(actionStatus.failure(error, options));
      }
    );
  };
}

export const userActions = {
  getUserSession,
};
