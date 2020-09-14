// import { authHeader } from '../helpers';

import { userApi, handleResponse, baseParams } from './apiconfig';

const getAllCategories = () => {
  return userApi.get(`/categories`, { ...baseParams }).then(handleResponse);
};

export const categoryServices = {
  getAllCategories,
};
