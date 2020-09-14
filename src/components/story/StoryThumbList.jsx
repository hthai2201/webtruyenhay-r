import React from 'react';
import Loading from '../general/Loading';
import Pagination from '../general/Pagination';

const StoryThumbList = ({
  title,
  loading,
  error,
  allStories,
  page,
  pageCount,
  onChangePage,
}) => {
  // render
  const renderAllStories = () => {
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
    if (!allStories) {
      return null;
    }
    if (!allStories.length) {
      return <div className="alert alert-warning">Danh sách trống</div>;
    }
    return allStories.map(story => {
      const {
        cover,
        slug,
        name,
        author,
        desc,

        chapters = [],
      } = story || {};
      const lastChapter = chapters[chapters.length - 1] || {};
      const { chapterId: lastChapterId } = lastChapter;
      return (
        <div key={slug} className="story-detail">
          <div className="row border-row justify-content-center align-items-center">
            <div className="col-md-3">
              <img src={cover} alt={name} />
            </div>
            <div className="col-md-7">
              <div className="info">
                <h3 className="name">
                  <a href={`/${slug}`}>{name}</a>
                </h3>

                <div className="desc text-overflow-2-lines">{desc}</div>
                <div className="author">
                  <i className="fa fa-pencil mr-1" aria-hidden="true"></i>
                  {author || 'test'}
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <a href="/" className="text-info">
                Chương {lastChapterId}
              </a>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <>
      <div className="list-title">
        <h2>{title}</h2>
      </div>
      <div className="list">
        {renderAllStories()}

        <Pagination
          align="center"
          page={page}
          pageCount={pageCount}
          onClick={onChangePage}
        />
      </div>
    </>
  );
};

export default StoryThumbList;
