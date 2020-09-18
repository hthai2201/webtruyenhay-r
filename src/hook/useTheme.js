import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { configActions } from '../_actions/config.actions';

const useTheme = mode => {
  const dispatch = useDispatch();
  const theme = useSelector(_ => _.config.theme);
  const setTheme = useCallback(
    data => {
      if (data) {
        const newTheme = {};
        newTheme.dark = data.background === 'dark';
        console.log('run thtmee');
        dispatch(configActions.setTheme(newTheme));
      }
    },
    [theme]
  );
  return [theme, setTheme];
};

export default useTheme;
