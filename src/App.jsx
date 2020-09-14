import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { history } from './helpers';
import { categoryActions, userActions } from './_actions';

import './style/style.scss';
import { Header } from './components';
import Footer from './components/general/Footer';
import Home from './app/Home/Home';
import Category from './app/Category/Category';
import SearchStory from './app/Story/SearchStory';
import HotStory from './app/Story/HotStory';
import StoryDetail from './app/Story/StoryDetail';
import StoryChapter from './app/Story/StoryChapter';
import FullStory from './app/Story/FullStory';

const ErrorComponent = ({ error }) => (
  <div className="container">
    <h2>Something went wrong!</h2>
    <hr />
    <div className="alert alert-danger">{error.toString()}</div>
    <a href="./">Try again!</a>
  </div>
);
const App = () => {
  // category
  const allCategories = useSelector(_ => _.category.allCategories);
  const getAllCategoriesLoading = useSelector(
    _ => _.category.getAllCategoriesLoading
  );
  const getAllCategoriesError = useSelector(
    _ => _.category.getAllCategoriesError
  );
  // user
  const currentUser = useSelector(_ => _.user.currentUser);
  const getUserInfoLoading = useSelector(_ => _.user.getUserInfoLoading);
  const getUserInfoError = useSelector(_ => _.user.getUserInfoError);

  const dispatch = useDispatch();
  // categories
  useEffect(() => {
    if (!getAllCategoriesLoading && !getAllCategoriesError && !allCategories) {
      dispatch(categoryActions.getAllCategories());
    }
  }, []);
  // user
  useEffect(() => {
    const token = localStorage.getItem('USER_TOKEN');

    if (token && !getUserInfoLoading && !getUserInfoError) {
      dispatch(userActions.getUserInfo());
    }
  }, []);

  const errorHandle = (error, componentStack) => {};
  return (
    <ErrorBoundary FallbackComponent={ErrorComponent} onError={errorHandle}>
      <Router history={history}>
        <Header
          allCategories={allCategories}
          getAllCategoriesLoading={getAllCategoriesLoading}
          getAllCategoriesError={getAllCategoriesError}
          currentUser={currentUser}
          userLoading={getUserInfoLoading}
          getUserInfoError={getUserInfoError}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/danh-sach/hot" component={HotStory} />
          <Route exact path="/danh-sach/full" component={FullStory} />
          <Route exact path="/the-loai/:categorySlug" component={Category} />
          <Route exact path="/tim-kiem" component={SearchStory} />
          <Route exact path="/:storySlug" component={StoryDetail} />
          <Route
            exact
            path="/:storySlug/chuong-:chapterId"
            component={StoryChapter}
          />
        </Switch>
        <Footer allCategories={allCategories} />
      </Router>
    </ErrorBoundary>
  );
};

export default App;