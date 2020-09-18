import { configConstants } from '../_constants';

function setBreadcrumb(data) {
  return { type: configConstants.SET_BREADCRUMB, data };
}
function setTheme(data) {
  return { type: configConstants.SET_THEME, data };
}

export const configActions = {
  setBreadcrumb,
  setTheme,
};
