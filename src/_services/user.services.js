import { userApi, handleResponse, getBaseParams } from './apiconfig';

const getUserSession = () => {
  return userApi.get(`/session`, { ...getBaseParams() }).then(handleResponse);
};

export const userServices = {
  getUserSession,
};
