// import { authHeader } from '../helpers';

import { userApi, handleResponse, getBaseParams } from './apiconfig';

const getAllCategories = () => {
  return userApi
    .get(`/categories`, { ...getBaseParams() })
    .then(handleResponse);
};

export const categoryServices = {
  getAllCategories,
};
