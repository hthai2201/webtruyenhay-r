import { configConstants } from '../_constants';

function setBreadcrumb(data) {
  return { type: configConstants.SET_BREADCRUMB, data };
}

export const configActions = {
  setBreadcrumb,
};
