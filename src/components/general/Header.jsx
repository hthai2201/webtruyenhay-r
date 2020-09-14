/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { storyActions } from '../../_actions';
import Loading from './Loading';
import Breadcrumb from './Breadcrumb';

const Header = ({ allCategories = [] }) => {
  const [showSearchResultBox, setShowSearchResultBox] = useState(false);
  const [q, setQ] = useState('');
  const breadcrumbList = [{ name: 'abc' }];
  const searchedStories = useSelector(_ => _.story.searchedStories);
  const searchStoriesLoading = useSelector(_ => _.story.searchStoriesLoading);
  const searchStoriesError = useSelector(_ => _.story.searchStoriesError);
  const dispatch = useDispatch();
  const history = useHistory();

  const numCol = 3;
  const colItemCount = Math.ceil(allCategories.length / numCol);
  const allCategoriesSlice = [...Array(3).keys()].map((_, index) =>
    allCategories.slice(colItemCount * index, colItemCount * (index + 1))
  );
  const searchStories = debounce(
    searchWords => dispatch(storyActions.searchStories({ searchWords })),
    1000
  );
  const onClickSearchBtn = e => {
    e.preventDefault();
    if (q) {
      history.push(`/tim-kiem?q=${q}`);
    }
  };
  const onChangeSearchInput = e => {
    e.persist();
    setQ(e.target.value);
    searchStories(e.target.value);
  };
  const renderSearchedtoriesResult = () => {
    if (searchStoriesLoading) {
      return <Loading />;
    }
    if (searchStoriesError) {
      return <div className="alert alert-danger">{searchStoriesError}</div>;
    }
    if (!searchedStories) {
      return null;
    }
    if (!searchedStories.length) {
      return <div className="alert alert-warning">Danh sách trống</div>;
    }
    return searchedStories.map(result => {
      return (
        <Link key={result.slug} to="/" className="list-group-item">
          {result.name}
        </Link>
      );
    });
  };
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg p-0 ">
          <Link className="navbar-brand header__logo" to="/">
            Logo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-list mr-1" aria-hidden="true"></i>
                  Danh mục
                </Link>

                <ul className="dropdown-menu" role="menu">
                  {allCategories && allCategories.length
                    ? allCategories.map(category => {
                        return (
                          <li key={category.slug}>
                            <Link to={`/the-loai/${category.slug}`}>
                              {category.name}
                            </Link>
                          </li>
                        );
                      })
                    : null}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="navbarDropdown2"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-list mr-1" aria-hidden="true"></i>
                  Thể loại
                </Link>

                <ul className={`dropdown-menu menu-cols-${numCol}`} role="menu">
                  <div className="row no-gutters">
                    {allCategoriesSlice.map((colItem, colItemIndex) => {
                      return (
                        <div
                          key={colItemIndex}
                          className={`col-md-${12 / numCol}`}
                        >
                          <ul className="dropdown-menu">
                            {colItem.map(category => {
                              return (
                                <li key={category.slug}>
                                  <Link to={`/the-loai/${category.slug}`}>
                                    {category.name}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </ul>
              </li>
            </ul>
            <form
              className="form-inline"
              autoComplete="off"
              onSubmit={onClickSearchBtn}
            >
              <div className="header__search">
                <input
                  autoComplete="off"
                  type="text"
                  placeholder="Tìm kiếm..."
                  name="tukhoa"
                  onChange={onChangeSearchInput}
                />
                <button type="submit">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
              <div className="list-group header__search-result">
                {renderSearchedtoriesResult()}
              </div>
            </form>
          </div>
        </nav>
      </div>
      <div className="breadcrumb-wrap">
        <div className="container">
          <Breadcrumb />
        </div>
      </div>
    </header>
  );
};

export default Header;