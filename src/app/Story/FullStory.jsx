import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Funtional } from '../../helpers';
import { storyActions } from '../../_actions';
import Loading from '../../components/general/Loading';
import Pagination from '../../components/general/Pagination';
import StoryThumbList from '../../components/story/StoryThumbList';
import { configActions } from '../../_actions/config.actions';

const FullStory = () => {
  const params = useParams();

  const [allStoriesFullOptions, setAllStoriesFullOptions] = useState({
    full: true,
  });
  const [category, setCategory] = useState({});

  const dispatch = useDispatch();
  const allCategories = useSelector(_ => _.category.allCategories);
  const allStoriesFull = useSelector(_ => _.story.allStoriesFull);
  const allStoriesFullPage = useSelector(_ => _.story.allStoriesFullPage);
  const allStoriesFullPageCount = useSelector(
    _ => _.story.allStoriesFullPageCount
  );

  const getAllStoriesFullLoading = useSelector(
    _ => _.story.getAllStoriesFullLoading
  );

  const getAllStoriesFullError = useSelector(
    _ => _.story.getAllStoriesFullError
  );
  const updateAllStoriesFullOptions = (prop, value) => {
    const newOptions = { ...allStoriesFullOptions, [prop]: value };
    if (prop === 'categorySlug') {
      const newCategory =
        allCategories && allCategories.length
          ? allCategories.find(item => item.slug === value)
          : null;
      if (newCategory) {
        setCategory(newCategory);
      }
    }
    console.log('run fullstory 1');
    dispatch(storyActions.getAllStoriesFull(newOptions));
    setAllStoriesFullOptions(newOptions);
  };
  useEffect(() => {
    const { categorySlug } = params;

    if (categorySlug) {
      updateAllStoriesFullOptions('categorySlug', categorySlug);
    }
    if (
      !getAllStoriesFullLoading &&
      (!allStoriesFull ||
        (categorySlug && allStoriesFullOptions.categorySlug !== categorySlug))
    ) {
      console.log('run fullstory 2');
      dispatch(
        storyActions.getAllStoriesFull({
          ...allStoriesFullOptions,
          categorySlug,
        })
      );
    }
  }, [params]);
  useEffect(() => {
    dispatch(
      configActions.setBreadcrumb([
        {
          name: `Truyện full`,
          path: `danh-sach/full`,
        },
      ])
    );
  }, []);
  // Function

  const onChangeAllStoriesFullCategoryOptions = e => {
    updateAllStoriesFullOptions('categorySlug', e.target.value);
  };
  const onChangePage = page => {
    updateAllStoriesFullOptions('page', page);
  };

  return (
    <div className="category">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <StoryThumbList
              title={`Truyện ${category.name || ''} Full`}
              allStories={allStoriesFull}
              page={allStoriesFullPage}
              pageCount={allStoriesFullPageCount}
              onChangePage={onChangePage}
              loading={getAllStoriesFullLoading}
              error={getAllStoriesFullError}
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
            <div className="panel">
              <div className="list-title">
                <h2>
                  <a href="/full">THỂ LOẠI TRUYỆN</a>
                </h2>
              </div>
              <div className="row text-center">
                {allCategories && allCategories.length
                  ? allCategories.map(category => {
                      return (
                        <div className="col-md-6" key={category.slug}>
                          <a
                            href={`/the-loai/${category.slug}`}
                            className="p-2"
                          >
                            {category.name}
                          </a>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullStory;
