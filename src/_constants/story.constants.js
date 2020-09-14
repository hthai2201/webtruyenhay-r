import keymirror from 'keymirror';

export const storyStatusContants = {
  notComplete: 'Đang ra',
  complete: 'Hoàn thành',
};
export const storyConstants = keymirror({
  GET_ALL_STORIES: undefined,
  GET_ALL_STORIES_SUCCESS: undefined,
  GET_ALL_STORIES_FAILURE: undefined,

  GET_ALL_STORIES_FULL: undefined,
  GET_ALL_STORIES_FULL_SUCCESS: undefined,
  GET_ALL_STORIES_FULL_FAILURE: undefined,

  GET_ALL_STORIES_HOT: undefined,
  GET_ALL_STORIES_HOT_SUCCESS: undefined,
  GET_ALL_STORIES_HOT_FAILURE: undefined,

  SEARCH_STORIES: undefined,
  SEARCH_STORIES_SUCCESS: undefined,
  SEARCH_STORIES_FAILURE: undefined,

  GET_STORY: undefined,
  GET_STORY_SUCCESS: undefined,
  GET_STORY_FAILURE: undefined,

  GET_CHAPTER: undefined,
  GET_CHAPTER_SUCCESS: undefined,
  GET_CHAPTER_FAILURE: undefined,
});
