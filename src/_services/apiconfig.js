import { create } from 'apisauce';
import config from 'config';

// define the api
export const staffApi = create({
  baseURL: config.staffApi,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 300000,
});

export const userApi = create({
  baseURL: config.userApi,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 300000,
});

export const getBaseParams = () => {
  const SSID = localStorage.getItem('SSID');
  return {
    SSID,
  };
};

export const handleResponse = response => {
  if (!response.ok) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      localStorage.removeItem('USER_TOKEN');
      window.location.reload(true);
    } else if (response.data && response.data.errors) {
      return Promise.reject(response.data.errors);
    } else {
      const error = 'Đã có lỗi xảy ra, vui lòng thử lại sau';
      return Promise.reject(error);
    }
  } else if (response.data && response.data.errors) {
    return Promise.reject(response.data.errors);
  }

  return response.data;
};
