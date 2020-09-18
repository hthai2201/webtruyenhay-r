import { configConstants } from '../_constants';

const INITIAL_STATE = {
  theme: {
    dark: false,
    fontSize: 16,
    lineHeight: '100%',
    fluid: false,
  },
};

export function configReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // SET_BREADCRUMB
    case configConstants.SET_BREADCRUMB: {
      return {
        ...state,
        breadcrumbList: action.data || [],
      };
    }

    // SET_THEME
    case configConstants.SET_THEME: {
      const theme = action.data
        ? { ...state.theme, ...action.data }
        : state.theme;
      console.log(theme);
      return {
        ...state,
        theme,
      };
    }

    default:
      return state;
  }
}
