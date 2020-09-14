import { createActionStatus } from './createActionStatus';
import { categoryConstants } from '../_constants';
import { categoryServices } from '../_services';

function getAllCategories() {
  const actionStatus = createActionStatus(categoryConstants.GET_ALL_CATEGORIES);
  return dispatch => {
    dispatch(actionStatus.request());
    categoryServices.getAllCategories().then(
      data => {
        dispatch(actionStatus.success(data));
      },
      error => {
        dispatch(actionStatus.failure(error));
      }
    );
  };
}

export const categoryActions = {
  getAllCategories,
};
