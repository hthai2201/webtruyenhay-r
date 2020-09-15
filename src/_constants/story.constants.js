import keymirror from 'keymirror';

export const RATE_TEXT = [
  {
    id: 1,
    text: 'Không còn gì để nói...',
  },
  {
    id: 2,
    text: 'WTF',
  },
  {
    id: 3,
    text: 'Cái gì thế này ?!',
  },
  {
    id: 4,
    text: 'Haizz',
  },
  {
    id: 5,
    text: 'Tạm',
  },
  {
    id: 6,
    text: 'Cũng được',
  },
  {
    id: 7,
    text: 'Khá đấy',
  },
  {
    id: 8,
    text: 'Được',
  },
  {
    id: 9,
    text: 'Hay',
  },
  {
    id: 10,
    text: 'Tuyệt đỉnh!',
  },
];

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

  RATE_STORY: undefined,
  RATE_STORY_SUCCESS: undefined,
  RATE_STORY_FAILURE: undefined,
});
