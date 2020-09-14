import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { storyActions } from '../../_actions';
import StoryThumbList from '../../components/story/StoryThumbList';
import CategoryPanel from '../../components/Category/CategoryPanel';
import { configActions } from '../../_actions/config.actions';

const SearchStory = () => {
  const params = useParams();
  const location = useLocation();
  const { q } = queryString.parse(location.search);
  const [searchedStoriesOptions, setSearchedStoriesOptions] = useState({});

  const dispatch = useDispatch();

  const searchedStories = useSelector(_ => _.story.searchedStories);
  const searchedStoriesPage = useSelector(_ => _.story.searchedStoriesPage);
  const searchedStoriesPageCount = useSelector(
    _ => _.story.searchedStoriesPageCount
  );

  const searchStoriesLoading = useSelector(_ => _.story.searchStoriesLoading);

  const searchStoriesError = useSelector(_ => _.story.searchStoriesError);
  const updateSearchedStoriesOptions = (prop, value) => {
    const newOptions = { ...searchedStoriesOptions, [prop]: value };

    dispatch(storyActions.searchStories(newOptions));
    setSearchedStoriesOptions(newOptions);
  };
  useEffect(() => {
    const { q: searchWords } = queryString.parse(location.search);

    if (searchWords) {
      updateSearchedStoriesOptions('searchWords', searchWords);

      if (
        !searchStoriesLoading &&
        (!searchedStories || searchedStoriesOptions.searchWords !== searchWords)
      ) {
        dispatch(
          storyActions.searchStories({
            ...searchedStoriesOptions,
            searchWords,
          })
        );
      }
    }
  }, [location]);
  useEffect(() => {
    dispatch(
      configActions.setBreadcrumb([
        {
          name: `Tìm kiếm với từ khoá: ${q}`,
          path: `tim-kiem/?tukhoa=${q}`,
        },
      ])
    );
  }, [location.search]);
  // Function

  const onChangePage = page => {
    updateSearchedStoriesOptions('page', page);
  };

  return (
    <div className="category">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <StoryThumbList
              title={`TÌM TRUYỆN VỚI TỪ KHOÁ: ${q || ''}`}
              allStories={searchedStories}
              page={searchedStoriesPage}
              pageCount={searchedStoriesPageCount}
              onChangePage={onChangePage}
              loading={searchStoriesLoading}
              error={searchStoriesError}
            />
          </div>
          <div className="col-md-3">
            <div className="panel">
              Truyện tiên hiệp thường kể về quá trình tu luyện và khám phá thế
              giới tu sĩ thần tiên đầy bí ẩn của nhân vật chính. Trong truyện
              tiên hiệp thường chia ra những cấp bậc tu luyện trước khi thành
              tiên như sau: Luyện Khí Khai Quang Trúc Cơ Ích Cốc Kết Đan (Kim
              Đan) Nguyên Anh Hóa Thần (Phân Thần) Hợp Thể Độ Kiếp Đại Thừa Sau
              khi thành tiên thì có những cấp bậc: Tán Tiên Tiên Nhân Địa Tiên
              Thiên Tiên Thượng Tiên Kim Tiên Huyền Tiên Đại La Kim Tiên Tiên
              Vương Tiên Tôn Tiên Đế Ngoài ra còn có những cấp độ ngoài tiên như
              Bán Thánh, Vô Cực Thánh Nhân,.. dựa theo trí tưởng tượng của tác
              giả.
            </div>
            <CategoryPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchStory;
