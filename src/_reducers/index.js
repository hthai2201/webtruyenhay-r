import { combineReducers } from 'redux';
import { userReducer } from './user.reducers';
import { categoryReducer } from './category.reducers';
import { storyReducer } from './story.reducers';
import { configReducer } from './config.reducers';

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  story: storyReducer,
  config: configReducer,
});

export default rootReducer;
