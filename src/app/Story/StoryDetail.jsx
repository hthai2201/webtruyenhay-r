import React, { useState, useEffect } from 'react';
import HotStoryPanel from '../../components/story/HotStoryPanel';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import { storyActions } from '../../_actions';
import RatingStory from './RatingStory';
import Loading from '../../components/general/Loading';
import { storyStatusContants } from '../../_constants/story.constants';
import Pagination from '../../components/general/Pagination';
import { configActions } from '../../_actions/config.actions';

const StoryDetail = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const [chapterPagination, setChapterPagination] = useState({
    chapters: [],
  });
  const story = useSelector(_ => _.story.story);
  const getStoryLoading = useSelector(_ => _.story.getStoryLoading);
  const getStoryError = useSelector(_ => _.story.getStoryError);
  const abc = useSelector(_ => _.story.allStoriesHotInDay);
  const onClickChapterPage = index => {
    if (
      index < 0 &&
      index < chapterPagination &&
      index !== chapterPagination.page
    ) {
      setChapterPagination({
        ...chapterPagination,
        page: index,
        chapters: story.chapters
          ? story.chapters.slice((index - 1) * 50, index * 50)
          : [],
      });
    }
  };
  useEffect(() => {
    const { storySlug } = params;
    if (!storySlug) {
      return;
    }
    if (
      !getStoryLoading &&
      !getStoryError &&
      (!story || story.slug !== storySlug)
    ) {
      dispatch(storyActions.getStory({ slug: storySlug }));
    }
  }, [params]);
  useEffect(() => {
    let { page } = queryString.parse(location.search);
    page = parseInt(page, 10) || 1;
    const {
      pageCount = story && story.chapters
        ? Math.ceil(story.chapters.length / 50)
        : 0,
    } = chapterPagination;

    if (
      story &&
      page &&
      pageCount &&
      page <= pageCount &&
      page !== chapterPagination.page
    ) {
      setChapterPagination({
        page,
        pageCount,
        chapters: story.chapters
          ? story.chapters.slice((page - 1) * 50, page * 50)
          : [],
      });
    }
  }, [story, chapterPagination, location]);
  useEffect(() => {
    if (story) {
      dispatch(
        configActions.setBreadcrumb([
          { name: story.name, path: `${story.slug}` },
        ])
      );
    }
  }, [story]);
  const {
    name,
    slug,
    desc,
    categories = [],
    author,
    status,
    rate = [],
    cover,
    chapterCount = 0,
    sameAuthorStories = abc,
    chapters = [],
  } = story || {};
  const avgRate = rate.length
    ? rate.reduce((sum, item) => sum + item.rating, 0) / rate.length
    : 5;
  const renderStoryInfo = () => {
    if (getStoryLoading) {
      return <Loading />;
    }
    if (getStoryError) {
      return <div className="alert alert-danger">{getStoryError}</div>;
    }
    return (
      <div className="row">
        <div className="col-sm-4">
          <img src={cover} alt={name} />
          <p className="categories">
            <b>Tác giả: </b>
            {author}
          </p>
          <p className="categories">
            <b>Thể loại: </b>
            {categories.map(i => i.name).join(',')}
          </p>
          <p className="categories">
            <b>Trạng thái: </b>
            {storyStatusContants[status]}
          </p>
        </div>
        <div className="col-sm-8">
          <div className="list-title justify-content-center story-name ">
            <h2 className="text-center">{name}</h2>
          </div>
          <div className="rate-wrap">
            <RatingStory rate={avgRate} />
            <div>
              <small>
                Đánh giá: <b>{avgRate}</b>/10 từ <b>{rate.length} lượt</b>
              </small>
            </div>
          </div>

          <p className="categories">
            <b>Thể loại: </b>
            {categories.map(i => i.name).join(',')}
          </p>
          <p className="desc">{desc}</p>
          <div className="story__actions">
            <Link to={`/${slug}/chuong-1`} className="button primary-btn mr-2">
              Đọc từ đầu
            </Link>
            <Link
              to={`/${slug}/chuong-${chapterCount}`}
              className="button primary-btn"
            >
              Đọc tiếp
            </Link>
          </div>
        </div>
      </div>
    );
  };
  const renderChapters = () => {
    if (getStoryLoading) {
      return <Loading />;
    }
    if (getStoryError) {
      return <div className="alert alert-danger">{getStoryError}</div>;
    }
    const twoCols = [
      chapterPagination.chapters.slice(
        0,
        Math.ceil(chapterPagination.chapters.length / 2)
      ),
      chapterPagination.chapters.slice(
        Math.ceil(chapterPagination.chapters.length / 2)
      ),
    ];
    return (
      <div className="row">
        {twoCols.map((col, colIndex) => {
          return (
            <div key={colIndex} className="col-sm-6">
              <ul className="list-chapter">
                {col.map(chapter => {
                  return (
                    <li key={chapter.slug} className="text-truncate">
                      <i class="fa fa-certificate mr-1" aria-hidden="true"></i>
                      <Link to={`/${slug}/chuong-${chapter.chapterId}`}>
                        Chương {chapter.chapterId}: {chapter.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <div className="col-12">
          <Pagination
            align="center"
            page={chapterPagination.page}
            pageCount={chapterPagination.pageCount}
            onClick={onClickChapterPage}
          />
        </div>
      </div>
    );
  };
  const renderSameAuthorStories = () => {
    return (
      <ul>
        {sameAuthorStories.map(story => {
          return (
            <li key={story.slug}>
              <i class="fa fa-chevron-right mr-1" aria-hidden="true"></i>
              <Link to={`/${story.slug}`}>{story.name}</Link>
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="story-detail">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div className="list-title">
              <h2>THÔNG TIN TRUYỆN</h2>
            </div>
            {renderStoryInfo()}
            <div className="list-title mb-3">
              <h2>DANH SÁCH CHƯƠNG</h2>
            </div>
            {renderChapters()}
            <div className="list-title">
              <h2>BÌNH LUẬN TRUYỆN</h2>
            </div>
          </div>
          <div className="col-md-3">
            {sameAuthorStories ? (
              <div className="panel">
                <div className="list-title">
                  <h2>TRUYỆN CÙNG TÁC GIẢ</h2>
                </div>
                {renderSameAuthorStories()}
              </div>
            ) : null}
            <HotStoryPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
