import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Funtional } from '../../helpers';
import { storyActions } from '../../_actions';
import Loading from '../../components/general/Loading';
import Pagination from '../../components/general/Pagination';
import StoryThumbList from '../../components/story/StoryThumbList';
import CategoryPanel from '../../components/Category/CategoryPanel';
import HotStoryPanel from '../../components/story/HotStoryPanel';
import { configActions } from '../../_actions/config.actions';

const Category = () => {
  const params = useParams();

  const [allStoriesOptions, setAllStoriesOptions] = useState({});
  const [category, setCategory] = useState({});

  const dispatch = useDispatch();
  const allCategories = useSelector(_ => _.category.allCategories);
  const allStories = useSelector(_ => _.story.allStories);
  const allStoriesPage = useSelector(_ => _.story.allStoriesPage);
  const allStoriesPageCount = useSelector(_ => _.story.allStoriesPageCount);

  const getAllStoriesLoading = useSelector(_ => _.story.getAllStoriesLoading);

  const getAllStoriesError = useSelector(_ => _.story.getAllStoriesError);
  const updateAllStoriesOptions = (prop, value) => {
    const newOptions = { ...allStoriesOptions, [prop]: value };
    if (prop === 'categorySlug') {
      const newCategory =
        allCategories && allCategories.length
          ? allCategories.find(item => item.slug === value)
          : null;
      if (newCategory) {
        setCategory(newCategory);
      }
    }
    dispatch(storyActions.getAllStories(newOptions));
    setAllStoriesOptions(newOptions);
  };
  useEffect(() => {
    const { categorySlug } = params;

    if (categorySlug) {
      updateAllStoriesOptions('categorySlug', categorySlug);

      if (
        !getAllStoriesLoading &&
        (!allStories || allStoriesOptions.categorySlug !== categorySlug)
      ) {
        dispatch(
          storyActions.getAllStories({
            ...allStoriesOptions,
            categorySlug,
          })
        );
      }
    }
  }, [params]);

  useEffect(() => {
    dispatch(
      configActions.setBreadcrumb([
        {
          name: category.name || params.categorySlug,
          path: `/the-loai/${category.slug || params.categorySlug}`,
        },
      ])
    );
  }, [category]);
  // Function

  const onChangeAllStoriesCategoryOptions = e => {
    updateAllStoriesOptions('categorySlug', e.target.value);
  };
  const onChangePage = page => {
    updateAllStoriesOptions('page', page);
  };

  return (
    <div className="category">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <StoryThumbList
              title={`Truyện ${category.name || ''}`}
              allStories={allStories}
              page={allStoriesPage}
              pageCount={allStoriesPageCount}
              onChangePage={onChangePage}
              loading={getAllStoriesLoading}
              error={getAllStoriesError}
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
            <HotStoryPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
