export const createActionStatus = status => ({
  request: options => ({ type: status, options }),
  success: (data, options) => ({ type: status + '_SUCCESS', data, options }),
  failure: (error, options) => ({
    type: status + '_FAILURE',
    error,
    options,
  }),
});
