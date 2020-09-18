import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Funtional } from '../../helpers';
import { storyActions } from '../../_actions';
import Loading from '../../components/general/Loading';
import RenderList from '../../components/general/RenderList';

const Home = () => {
  const [allStoriesOptions, setAllStoriesOptions] = useState({});
  const [allStoriesFullOptions, setAllStoriesFullOptions] = useState({});
  const [allStoriesHotOptions, setAllStoriesHotOptions] = useState({});
  const dispatch = useDispatch();
  const historyStories = useSelector(_ => _.user.historyStories);
  const allCategories = useSelector(_ => _.category.allCategories);
  const allStories = useSelector(_ => _.story.allStories);
  const allStoriesFull = useSelector(_ => _.story.allStoriesFull);
  const allStoriesHot = useSelector(_ => _.story.allStoriesHot);
  const [bestHotStory = {}, ...otherHotStories] = allStoriesHot || [];
  const getAllStoriesLoading = useSelector(_ => _.story.getAllStoriesLoading);
  const getAllStoriesFullLoading = useSelector(
    _ => _.story.getAllStoriesFullLoading
  );
  const getAllStoriesHotLoading = useSelector(
    _ => _.story.getAllStoriesHotLoading
  );
  const getAllStoriesError = useSelector(_ => _.story.getAllStoriesError);
  const getAllStoriesFullError = useSelector(
    _ => _.story.getAllStoriesFullError
  );
  const getAllStoriesHotError = useSelector(_ => _.story.getAllStoriesHotError);

  useEffect(() => {
    if (!getAllStoriesLoading && !allStories) {
      dispatch(storyActions.getAllStories(allStoriesOptions));
    }
    if (!getAllStoriesFullLoading && !allStoriesFull) {
      dispatch(storyActions.getAllStoriesFull(allStoriesFullOptions));
    }
    if (!getAllStoriesHotLoading && !allStoriesHot) {
      dispatch(storyActions.getAllStoriesHot(allStoriesHotOptions));
    }
  }, []);
  // Function
  const updateAllStoriesOptions = (prop, value) => {
    const newOptions = { ...allStoriesOptions, [prop]: value };
    dispatch(storyActions.getAllStories(newOptions));
    setAllStoriesOptions(newOptions);
  };
  const updateAllStoriesFullOptions = (prop, value) => {
    const newOptions = { ...allStoriesFullOptions, [prop]: value };
    dispatch(storyActions.getAllStoriesFull(newOptions));
    setAllStoriesFullOptions(newOptions);
  };
  const updateAllStoriesHotOptions = (prop, value) => {
    const newOptions = { ...allStoriesHotOptions, [prop]: value };

    dispatch(storyActions.getAllStoriesHot(newOptions));
    setAllStoriesHotOptions(newOptions);
  };
  const onChangeAllStoriesCategoryOptions = e => {
    updateAllStoriesOptions('categorySlug', e.target.value);
  };
  const onChangeAllStoriesFullCategoryOptions = e => {
    updateAllStoriesFullOptions('categorySlug', e.target.value);
  };
  const onChangeAllStoriesHotCategoryOptions = e => {
    updateAllStoriesHotOptions('categorySlug', e.target.value);
  };
  // render
  const renderAllStories = () => {
    return (
      <div className="row-striped">
        <RenderList
          list={allStories}
          loading={getAllStoriesLoading}
          error={getAllStoriesError}
          renderItem={story => {
            const { slug, name, categories = [], chapters = [] } = story || {};
            const lastChapter = chapters[chapters.length - 1] || {};
            const {
              chapterId: lastChapterId,
              updatedAt: lastChapterUpdateTime,
            } = lastChapter;
            return (
              <div key={slug} className="row border-row">
                <div className="col-md-5 text-truncate">
                  <i
                    className="fa fa-chevron-right mr-1"
                    aria-hidden="true"
                  ></i>

                  <Link to={`/${slug}`}>{name}</Link>
                </div>
                <div className="col-md-3 text-truncate">
                  <span>
                    {categories.map(category => category.name).join(',')}
                  </span>
                </div>
                <div className="col-md-2">
                  <Link
                    to={`/${slug}/chuong-${lastChapterId}`}
                    className="text-info"
                  >
                    Chương {lastChapterId}
                  </Link>
                </div>
                <div className="col-md-2">
                  <span>{Funtional.fromNowTime(lastChapterUpdateTime)}</span>
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  };
  const renderAllStoriesFull = () => {
    return (
      <div className="full-stories mt-2">
        <div className="row">
          <RenderList
            list={allStoriesFull}
            loading={getAllStoriesFullLoading}
            error={getAllStoriesFullError}
            renderItem={story => {
              return (
                <div key={story.slug} className="col-4 col-sm-3 col-md-2">
                  <Link to={`/${story.slug}`} className="story-thumb">
                    <img src={story.cover} alt={story.name} />
                    <div className="caption">
                      <h3 className="text-truncate">{story.name}</h3>
                      <small className="btn-xs label-primary text-truncate">
                        Full - {(story.chapters && story.chapters.length) || 0}{' '}
                        chương
                      </small>
                    </div>
                    .
                  </Link>
                </div>
              );
            }}
          />
        </div>
      </div>
    );
  };
  const renderAllStoriesHot = () => {
    if (getAllStoriesHotLoading) {
      return <Loading />;
    }
    return (
      <div className="hot-stories-list">
        <div className="top-1">
          <Link to={`/${bestHotStory.slug}`} className="story-overlay">
            <div className="label-full"></div>
            <img src={bestHotStory.cover} alt={bestHotStory.name} />
            <div className="story-overlay__name">{bestHotStory.name}</div>
          </Link>
        </div>
        <div className="top-other">
          <RenderList
            list={otherHotStories}
            loading={getAllStoriesHotLoading}
            error={getAllStoriesHotError}
            renderItem={story => {
              return (
                <Link
                  key={story.slug}
                  to={`/${story.slug}`}
                  className="story-overlay"
                >
                  <div className="label-full"></div>
                  <img src={story.cover} alt={story.name} />
                  <div className="story-overlay__name">{story.name}</div>
                </Link>
              );
            }}
          />
        </div>
      </div>
    );
  };
  const renderSelectCategories = (value, onChange) => {
    return (
      <select
        defaultValue={value}
        onChange={onChange}
        className="custom-select"
      >
        <option value="">TẤT CẢ</option>
        <RenderList
          list={allCategories}
          emptyList={() => null}
          renderItem={category => {
            return (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            );
          }}
        />
      </select>
    );
  };

  return (
    <div className="home">
      <div className="container">
        <section className="hot-stories">
          <div className="list-title">
            <h2>
              <Link to="/danh-sach/hot">
                Truyện Hot <i className="fa fa-fire" aria-hidden="true"></i>
              </Link>
            </h2>
            {renderSelectCategories(
              allStoriesHotOptions.categorySlug,
              onChangeAllStoriesHotCategoryOptions
            )}
          </div>
          {renderAllStoriesHot()}
        </section>

        <section className="all-stories">
          <div className="row">
            <div className="col-md-8">
              <div className="list-title">
                <h2>
                  <Link to="/danh-sach">
                    Truyện Mới Cập Nhật
                    <i
                      className="fa fa-chevron-right ml-1"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </h2>
                {renderSelectCategories(
                  allStoriesOptions.categorySlug,
                  onChangeAllStoriesCategoryOptions
                )}
              </div>

              {renderAllStories()}
            </div>{' '}
            <div className="col-md-4">
              {historyStories && historyStories.length ? (
                <div className="panel">
                  <div className="list-title">
                    <h2>
                      <Link to="/">TRUYỆN ĐANG ĐỌC</Link>
                    </h2>
                  </div>

                  <div className="row-striped">
                    {historyStories.map(story => {
                      const { slug, name, lastReadChapter = {} } = story || {};

                      const { chapterId: lastChapterId } = lastReadChapter;
                      return (
                        <div key={slug} className="row border-row">
                          <div className="col-6 text-truncate">
                            <i
                              className="fa fa-chevron-right mr-1"
                              aria-hidden="true"
                            ></i>
                            <span className="">{name}</span>
                          </div>

                          <div className="col-6">
                            <Link
                              to={`/${slug}/chuong-${lastChapterId}`}
                              className="text-info"
                            >
                              Đọc tiếp C{lastChapterId}
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <div className="panel">
                <div className="list-title">
                  <h2>
                    <Link to="/the-loai">THỂ LOẠI TRUYỆN</Link>
                  </h2>
                </div>
                <div className="row text-center">
                  {allCategories && allCategories.length
                    ? allCategories.map(category => {
                        return (
                          <div className="col-md-6" key={category.slug}>
                            <Link
                              to={`/the-loai/${category.slug}`}
                              className="p-2"
                            >
                              {category.name}
                            </Link>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="full-stories">
          <div className="list-title">
            <h2>
              <Link to="/danh-sach/full">
                Truyện Hoàn Thành
                <i className="fa fa-fire" aria-hidden="true"></i>
              </Link>
            </h2>
            {renderSelectCategories(
              allStoriesFullOptions.categorySlug,
              onChangeAllStoriesFullCategoryOptions
            )}
          </div>
          {renderAllStoriesFull()}
        </section>
      </div>
    </div>
  );
};

export default Home;
