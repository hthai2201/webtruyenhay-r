import { storyConstants } from '../_constants';

const INITIAL_STATE = {};

export function storyReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // GET_ALL_STORIES
    case storyConstants.GET_ALL_STORIES: {
      return {
        ...state,
        getAllStoriesLoading: true,
        getAllStoriesError: null,
        getAllStoriesSuccess: false,
        allStories: [],
      };
    }
    case storyConstants.GET_ALL_STORIES_SUCCESS: {
      const { allStories = [], page = 1, pageCount = 1 } = action.data || {};
      return {
        ...state,
        getAllStoriesLoading: false,
        getAllStoriesSuccess: true,
        allStories,
        allStoriesPage: page,
        allStoriesPageCount: pageCount,
      };
    }

    case storyConstants.GET_ALL_STORIES_FAILURE: {
      return {
        ...state,
        getAllStoriesLoading: false,
        getAllStoriesError: action.error,
      };
    }
    // GET_ALL_STORIES_FULL
    case storyConstants.GET_ALL_STORIES_FULL: {
      return {
        ...state,
        getAllStoriesFullLoading: true,
        getAllStoriesFullError: null,
        getAllStoriesFullSuccess: false,
        allStoriesFull: [],
      };
    }
    case storyConstants.GET_ALL_STORIES_FULL_SUCCESS: {
      const { allStories = [], page = 1, pageCount = 1 } = action.data || {};
      return {
        ...state,
        getAllStoriesFullLoading: false,
        getAllStoriesFullSuccess: true,
        allStoriesFull: allStories,
        allStoriesFullPage: page,
        allStoriesFullPageCount: pageCount,
      };
    }

    case storyConstants.GET_ALL_STORIES_FULL_FAILURE: {
      return {
        ...state,
        getAllStoriesFullLoading: false,
        getAllStoriesFullError: action.error,
      };
    }

    // GET_ALL_STORIES_HOT
    case storyConstants.GET_ALL_STORIES_HOT: {
      const { inDay, inMonth, inAll } = action.options || {};
      const object = {};

      if (!(inDay || inMonth || inAll)) {
        object.allStoriesHot = [];
      } else {
        if (inDay) {
          object.allStoriesHotInDay = [];
        }
        if (inMonth) {
          object.allStoriesHotInMonth = [];
        }
        if (inAll) {
          object.allStoriesHotInAll = [];
        }
      }

      return {
        ...state,
        getAllStoriesHotLoading: true,
        getAllStoriesHotError: null,
        getAllStoriesHotSuccess: false,
        ...object,
      };
    }
    case storyConstants.GET_ALL_STORIES_HOT_SUCCESS: {
      const { allStories = [], page = 1, pageCount = 1 } = action.data || {};
      const { inDay, inMonth, inAll } = action.options || {};
      const object = {};

      if (!(inDay || inMonth || inAll)) {
        object.allStoriesHot = allStories;
        object.allStoriesHotPage = page;
        object.allStoriesHotPageCount = pageCount;
      } else {
        if (inDay) {
          object.allStoriesHotInDay = allStories;
        }
        if (inMonth) {
          object.allStoriesHotInMonth = allStories;
        }
        if (inAll) {
          object.allStoriesHotInAll = allStories;
        }
      }

      return {
        ...state,
        getAllStoriesHotLoading: false,
        getAllStoriesHotSuccess: true,
        ...object,
      };
    }

    case storyConstants.GET_ALL_STORIES_HOT_FAILURE: {
      return {
        ...state,
        getAllStoriesHotLoading: false,
        getAllStoriesHotError: action.error,
      };
    }

    // SEARCH_STORIES
    case storyConstants.SEARCH_STORIES: {
      return {
        ...state,
        searchStoriesLoading: true,
        searchStoriesError: null,
        searchStoriesSuccess: false,
        searchedStories: [],
      };
    }
    case storyConstants.SEARCH_STORIES_SUCCESS: {
      const { allStories: searchedStories = [], page = 1, pageCount = 1 } =
        action.data || {};
      return {
        ...state,
        searchStoriesLoading: false,
        searchStoriesSuccess: true,
        searchedStories,
        searchedStoriesPage: page,
        searchedStoriesPageCount: pageCount,
      };
    }

    case storyConstants.SEARCH_STORIES_FAILURE: {
      return {
        ...state,
        searchStoriesLoading: false,
        searchStoriesError: action.error,
      };
    }

    // GET_STORY
    case storyConstants.GET_STORY: {
      return {
        ...state,
        getStoryLoading: true,
        getStoryError: null,
        getStorySuccess: false,
        story: {},
      };
    }
    case storyConstants.GET_STORY_SUCCESS: {
      return {
        ...state,
        getStoryLoading: false,
        getStorySuccess: true,
        story: action.data,
      };
    }

    case storyConstants.GET_STORY_FAILURE: {
      return {
        ...state,
        getStoryLoading: false,
        getStoryError: action.error,
      };
    }
    // GET_CHAPTER
    case storyConstants.GET_CHAPTER: {
      return {
        ...state,
        getChapterLoading: true,
        getChapterError: null,
        getChapterSuccess: false,
        chapter: null,
      };
    }
    case storyConstants.GET_CHAPTER_SUCCESS: {
      return {
        ...state,
        getChapterLoading: false,
        getChapterSuccess: true,
        chapter: action.data,
      };
    }

    case storyConstants.GET_CHAPTER_FAILURE: {
      return {
        ...state,
        getChapterLoading: false,
        getChapterError: action.error,
      };
    }

    default:
      return state;
  }
}
