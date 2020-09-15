import { createActionStatus } from './createActionStatus';
import { storyConstants } from '../_constants';
import { storyServices } from '../_services';

function getAllStories(options) {
  const actionStatus = createActionStatus(storyConstants.GET_ALL_STORIES);
  return dispatch => {
    dispatch(actionStatus.request());
    storyServices.getAllStories(options).then(
      data => {
        dispatch(actionStatus.success(data));
      },
      error => {
        dispatch(actionStatus.failure(error));
      }
    );
  };
}
function getAllStoriesFull(options) {
  const actionStatus = createActionStatus(storyConstants.GET_ALL_STORIES_FULL);
  return dispatch => {
    dispatch(actionStatus.request());
    storyServices.getAllStoriesFull(options).then(
      data => {
        dispatch(actionStatus.success(data));
      },
      error => {
        dispatch(actionStatus.failure(error));
      }
    );
  };
}
function getAllStoriesHot(options) {
  const actionStatus = createActionStatus(storyConstants.GET_ALL_STORIES_HOT);
  return dispatch => {
    dispatch(actionStatus.request(options));
    storyServices.getAllStoriesHot(options).then(
      data => {
        dispatch(actionStatus.success(data, options));
      },
      error => {
        dispatch(actionStatus.failure(error));
      }
    );
  };
}

function searchStories(options) {
  const actionStatus = createActionStatus(storyConstants.SEARCH_STORIES);
  return dispatch => {
    dispatch(actionStatus.request());
    storyServices.searchStories(options).then(
      data => {
        dispatch(actionStatus.success(data));
      },
      error => {
        dispatch(actionStatus.failure(error));
      }
    );
  };
}
function getStory(options) {
  const actionStatus = createActionStatus(storyConstants.GET_STORY);
  return dispatch => {
    dispatch(actionStatus.request());
    storyServices.getStory(options).then(
      data => {
        dispatch(actionStatus.success(data));
      },
      error => {
        dispatch(actionStatus.failure(error));
      }
    );
  };
}

function getChapter(options) {
  const actionStatus = createActionStatus(storyConstants.GET_CHAPTER);
  return dispatch => {
    dispatch(actionStatus.request(options));
    storyServices.getChapter(options).then(
      data => {
        dispatch(actionStatus.success(data, options));
      },
      error => {
        dispatch(actionStatus.failure(error, options));
      }
    );
  };
}

function rateStory(options) {
  const actionStatus = createActionStatus(storyConstants.RATE_STORY);
  return dispatch => {
    dispatch(actionStatus.request(options));
    storyServices.rateStory(options).then(
      data => {
        dispatch(actionStatus.success(data, options));
      },
      error => {
        dispatch(actionStatus.failure(error, options));
      }
    );
  };
}
export const storyActions = {
  getAllStories,
  getAllStoriesFull,
  getAllStoriesHot,
  searchStories,
  getStory,
  getChapter,
  rateStory,
};
