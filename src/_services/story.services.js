// import { authHeader } from '../helpers';
import { userApi, handleResponse, getBaseParams } from './apiconfig';

const getAllStories = (options = {}) => {
  return userApi
    .get(`/stories`, { ...getBaseParams(), ...options })
    .then(handleResponse);
};

const getAllStoriesHot = (options = {}) => {
  return userApi
    .get(`/stories`, { ...getBaseParams(), ...options })
    .then(handleResponse);
};
const getAllStoriesFull = (options = {}) => {
  return userApi
    .get(`/stories`, { ...getBaseParams(), ...options })
    .then(handleResponse);
};
const searchStories = (options = {}) => {
  return userApi
    .get(`/stories`, { ...getBaseParams(), ...options })
    .then(handleResponse);
};
const getStory = ({ slug, ...options }) => {
  return userApi
    .get(`/stories/${slug}`, { ...getBaseParams(), ...options })
    .then(handleResponse);
};
const getChapter = ({ chapterId, slug, ...options }) => {
  return userApi
    .get(`/stories/${slug}/chuong-${chapterId}`, {
      ...getBaseParams(),
      ...options,
    })
    .then(handleResponse);
};
const rateStory = ({ slug, ...options }) => {
  return userApi
    .post(`/stories/${slug}/rate`, {
      ...getBaseParams(),
      ...options,
    })
    .then(handleResponse);
};
export const storyServices = {
  getAllStories,
  getAllStoriesHot,
  getAllStoriesFull,
  searchStories,
  getStory,
  getChapter,
  rateStory,
};
