import { categoryConstants } from '../_constants';

const INITIAL_STATE = {};

export function categoryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // GET_ALL_CATEGORIES
    case categoryConstants.GET_ALL_CATEGORIES: {
      return {
        ...state,
        getAllCategoriesLoading: true,
        getAllCategoriesError: null,
        getAllCategoriesSuccess: false,
        allCategories: [],
      };
    }
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS: {
      return {
        ...state,
        getAllCategoriesLoading: false,
        getAllCategoriesSuccess: true,
        allCategories: action.data,
      };
    }

    case categoryConstants.GET_ALL_CATEGORIES_FAILURE: {
      return {
        ...state,
        getAllCategoriesLoading: false,
        getAllCategoriesError: action.error,
      };
    }

    default:
      return state;
  }
}
