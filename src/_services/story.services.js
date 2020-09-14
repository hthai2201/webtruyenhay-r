// import { authHeader } from '../helpers';

import { userApi, handleResponse, baseParams } from './apiconfig';

const getAllStories = (options = {}) => {
  return userApi
    .get(`/stories`, { ...baseParams, ...options })
    .then(handleResponse);
};

const getAllStoriesHot = (options = {}) => {
  return userApi
    .get(`/stories`, { ...baseParams, ...options })
    .then(handleResponse);
};
const getAllStoriesFull = (options = {}) => {
  return userApi
    .get(`/stories`, { ...baseParams, ...options })
    .then(handleResponse);
};
const searchStories = (options = {}) => {
  return userApi
    .get(`/stories`, { ...baseParams, ...options })
    .then(handleResponse);
};
const getStory = (options = {}) => {
  return userApi
    .get(`/stories/download/${options.slug}`, { ...baseParams, ...options })
    .then(handleResponse);
};
const getChapter = ({ chapterId, slug, ...options }) => {
  return userApi
    .get(`/stories/${slug}/chuong-${chapterId}`, { ...baseParams, ...options })
    .then(handleResponse);
};
export const storyServices = {
  getAllStories,
  getAllStoriesHot,
  getAllStoriesFull,
  searchStories,
  getStory,
  getChapter,
};
