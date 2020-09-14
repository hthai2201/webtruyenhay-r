import { authHeader } from '../helpers';

import { userApi, handleResponse, baseParams } from './apiconfig';

const login = (email, password) => {
  return userApi
    .post(`customers/auth/`, { ...baseParams, email, password })
    .then(handleResponse);
};

const register = (firstName, email, password) => {
  return userApi
    .post(`customers/`, { ...baseParams, firstName, email, password })
    .then(handleResponse);
};

const getUserInfo = () => {
  userApi.setHeaders({
    ...authHeader(),
  });
  return userApi.get(`/`, { ...baseParams }).then(handleResponse);
};

export const userServices = {
  login,
  register,
  getUserInfo,
};
