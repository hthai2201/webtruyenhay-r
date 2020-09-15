/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { storyActions, userActions } from '../../_actions';
import Loading from '../../components/general/Loading';
import { configActions } from '../../_actions/config.actions';

const StoryChapter = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const [showChapterSelect, setShowChapterSelect] = useState(false);
  const chapter = useSelector(_ => _.story.chapter);
  const getChapterLoading = useSelector(_ => _.story.getChapterLoading);
  const getChapterError = useSelector(_ => _.story.getChapterError);
  const getChapterSuccess = useSelector(_ => _.story.getChapterSuccess);
  const toChapter = (storySlug, chapterId) => {
    history.push(`/${storySlug}/chuong-${chapterId}`);
  };
  const onChangeChapter = e => {
    const { storySlug } = params;
    const { value: chapterId } = e.target;
    if (storySlug && chapterId) {
      toChapter(storySlug, chapterId);
    }
  };

  useEffect(() => {
    const { chapterId, storySlug } = params;

    if (
      chapterId &&
      storySlug &&
      !getChapterLoading &&
      !getChapterError &&
      (!chapter ||
        chapter.chapterId !== parseInt(chapterId, 10) ||
        (chapter.story && chapter.story.slug !== storySlug))
    ) {
      dispatch(storyActions.getChapter({ chapterId, slug: storySlug }));
    }
  }, [params]);
  const {
    name,
    chapterId,
    content,
    story = {
      name: 'Tên truyện',
      chapters: [],
      chapterCount: 0,
    },
  } = chapter || {};

  useEffect(() => {
    dispatch(
      configActions.setBreadcrumb([
        {
          name: story.name || params.storySlug,
          path: `${story.slug || params.storySlug}`,
        },
        {
          name: `Chương ${chapterId || params.chapterId}`,
          path: `chuong-${chapterId || params.chapterId}`,
        },
      ])
    );
  }, [chapter]);
  useEffect(() => {
    if (getChapterSuccess) {
      dispatch(userActions.getUserSession());
    }
  }, [getChapterSuccess]);
  const renderChapterNavigation = () => {
    return (
      <div className="chapter__nav">
        <Link
          to={`/${story.slug}/chuong-${chapterId - 1}`}
          className={`button chapter__nav-item  btn-success mr-2 ${
            chapterId === 1 ? 'disabled' : ''
          }`}
        >
          <i className="fa fa-chevron-left mr-1" aria-hidden="true"></i> Chương
          trước
        </Link>
        {showChapterSelect ? (
          <div className="chapter__nav-select">
            <select
              onChange={onChangeChapter}
              className=" button btn-success"
              aria-label="Chọn thể loại"
              defaultValue={chapterId}
            >
              {story.chapters &&
                story.chapters.map(chap => {
                  return (
                    <option key={chap.chapterId} value={chap.chapterId}>
                      Chương {chap.chapterId}
                    </option>
                  );
                })}
            </select>
          </div>
        ) : (
          <button
            type="button"
            className="button chapter__nav-item btn-success"
            onClick={() => setShowChapterSelect(true)}
          >
            <i className="fa fa-list-alt" aria-hidden="true"></i>
          </button>
        )}

        <Link
          to={`/${story.slug}/chuong-${story.chapterCount}`}
          className="button chapter__nav-item  btn-success ml-2"
        >
          Chương tiếp
          <i className="fa fa-chevron-right ml-2" aria-hidden="true"></i>
        </Link>
      </div>
    );
  };
  return (
    <div className="chapter">
      {getChapterError ? (
        <div className="alert alert-danger">{getChapterError}</div>
      ) : (
        <div className="container">
          <div className="chapter__header">
            {getChapterLoading ? (
              <Loading />
            ) : (
              <>
                <h2 className="chapter__story-name">{story.name}</h2>
                <div>
                  <h4 className="chapter__name">{`Chương ${chapterId}: ${name}`}</h4>
                </div>
              </>
            )}
            <hr className="chapter-start" />
            {renderChapterNavigation()}
            <hr className="chapter-end" />
          </div>
          <div className="chapter__content">
            {getChapterLoading ? (
              <div className="text-center">
                <Loading />
              </div>
            ) : (
              (content || '').split('\n').map(function (item, idx) {
                return <p key={idx}>{item}</p>;
              })
            )}
          </div>
          <div className="chapter__footer">
            <hr className="chapter-end" />
            {renderChapterNavigation()}
            <div className="bg-light text-center visible-md visible-lg box-notice">
              Bạn có thể dùng phím mũi tên hoặc WASD để lùi/sang chương.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryChapter;
