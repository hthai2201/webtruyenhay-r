import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import RenderList from '../general/RenderList';
import { storyActions } from '../../_actions';

const HotStoryPanel = () => {
  const [currentTabName, setCurrentTabName] = useState('inDay');
  const dispatch = useDispatch();

  const allStoriesHotInDay = useSelector(_ => _.story.allStoriesHotInDay);
  const allStoriesHotInMonth = useSelector(_ => _.story.allStoriesHotInMonth);
  const allStoriesHotInAll = useSelector(_ => _.story.allStoriesHotInAll);

  const getAllStoriesHotLoading = useSelector(
    _ => _.story.getAllStoriesHotLoading
  );
  const getAllStoriesHotError = useSelector(_ => _.story.getAllStoriesHotError);
  const onChangeTab = (name, e) => {
    e.preventDefault();
    if (name !== currentTabName) {
      setCurrentTabName(name);
    }
  };
  useEffect(() => {
    if (!getAllStoriesHotLoading && !getAllStoriesHotError) {
      if (!allStoriesHotInDay) {
        dispatch(storyActions.getAllStoriesHot({ inDay: true }));
      }
      if (!allStoriesHotInMonth) {
        dispatch(storyActions.getAllStoriesHot({ inMonth: true }));
      }
      if (!allStoriesHotInAll) {
        dispatch(storyActions.getAllStoriesHot({ inAll: true }));
      }
    }
  }, [allStoriesHotInDay, allStoriesHotInMonth, allStoriesHotInAll]);
  return (
    <div className="panel bg-none">
      <div className="list-title">
        <h2>
          <a href="/hot">TRUYỆN ĐANG HOT</a>
        </h2>
      </div>
      <div className="wtabs">
        <div className="wtabs__tabs">
          <button
            onClick={e => onChangeTab('inDay', e)}
            type="button"
            className={`wtabs__tab ${
              currentTabName === 'inDay' ? 'wtabs__tab--active' : ''
            }`}
          >
            NGÀY
          </button>
          <button
            onClick={e => onChangeTab('inMonth', e)}
            type="button"
            className={`wtabs__tab ${
              currentTabName === 'inMonth' ? 'wtabs__tab--active' : ''
            }`}
          >
            THÁNG
          </button>
          <button
            onClick={e => onChangeTab('inAll', e)}
            type="button"
            className={`wtabs__tab ${
              currentTabName === 'inAll' ? 'wtabs__tab--active' : ''
            }`}
          >
            ALL TIME
          </button>
        </div>
        <div className="wtabs__tab-panels">
          <div
            className={`wtabs__tab-panel ${
              currentTabName === 'inDay' ? 'wtabs__tab-panel--active' : ''
            }`}
          >
            <div className="row">
              <RenderList
                list={allStoriesHotInDay}
                loading={getAllStoriesHotLoading}
                error={getAllStoriesHotError}
                renderItem={(story, storyIndex) => {
                  const { name, slug, categories = [] } = story;
                  return (
                    <div className="col-12">
                      <div className="top-story">
                        <div
                          className={`top-story__prefix top-story__prefix-${
                            storyIndex + 1
                          }`}
                        >
                          {storyIndex + 1}
                        </div>
                        <div className="top-story__info text-truncate">
                          <h4>
                            <Link to={`/${slug}`}>{name}</Link>
                          </h4>
                          <small>
                            {categories.map(category => {
                              return (
                                <Link
                                  key={category.slug}
                                  to={`/the-loai/${category.slug}`}
                                >
                                  {category.name}
                                </Link>
                              );
                            })}
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
            </div>
          </div>
          <div
            className={`wtabs__tab-panel ${
              currentTabName === 'inMonth' ? 'wtabs__tab-panel--active' : ''
            }`}
          >
            <div className="row">
              <RenderList
                list={allStoriesHotInMonth}
                loading={getAllStoriesHotLoading}
                error={getAllStoriesHotError}
                renderItem={(story, storyIndex) => {
                  const { name, slug, categories = [] } = story;
                  return (
                    <div className="col-12">
                      <div className="top-story">
                        <div
                          className={`top-story__prefix top-story__prefix-${
                            storyIndex + 1
                          }`}
                        >
                          {storyIndex + 1}
                        </div>
                        <div className="top-story__info text-truncate">
                          <h4>
                            <Link to={`/${slug}`}>{name}</Link>
                          </h4>
                          <small>
                            {categories.map(category => {
                              return (
                                <Link
                                  key={category.slug}
                                  to={`/the-loai/${category.slug}`}
                                >
                                  {category.name}
                                </Link>
                              );
                            })}
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
            </div>
          </div>
          <div
            className={`wtabs__tab-panel ${
              currentTabName === 'inAll' ? 'wtabs__tab-panel--active' : ''
            }`}
          >
            <div className="row">
              <RenderList
                list={allStoriesHotInAll}
                loading={getAllStoriesHotLoading}
                error={getAllStoriesHotError}
                renderItem={(story, storyIndex) => {
                  const { name, slug, categories = [] } = story;
                  return (
                    <div className="col-12">
                      <div className="top-story">
                        <div
                          className={`top-story__prefix top-story__prefix-${
                            storyIndex + 1
                          }`}
                        >
                          {storyIndex + 1}
                        </div>
                        <div className="top-story__info text-truncate">
                          <h4 className="">
                            <Link to={`/${slug}`}>{name}</Link>
                          </h4>
                          <small>
                            {categories.map(category => {
                              return (
                                <Link
                                  key={category.slug}
                                  to={`/the-loai/${category.slug}`}
                                >
                                  {category.name}
                                </Link>
                              );
                            })}
                          </small>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotStoryPanel;
