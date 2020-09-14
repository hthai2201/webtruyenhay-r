import { configConstants } from '../_constants';

const INITIAL_STATE = {};

export function configReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // SET_BREADCRUMB
    case configConstants.SET_BREADCRUMB: {
      return {
        ...state,
        breadcrumbList: action.data || [],
      };
    }

    default:
      return state;
  }
}
