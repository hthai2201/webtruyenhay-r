import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { storyActions } from '../../_actions';
import StoryThumbList from '../../components/story/StoryThumbList';
import { configActions } from '../../_actions/config.actions';

const HotStory = () => {
  const params = useParams();

  const [allStoriesHotOptions, setAllStoriesHotOptions] = useState({
    hot: true,
  });
  const [category, setCategory] = useState({});

  const dispatch = useDispatch();
  const allCategories = useSelector(_ => _.category.allCategories);
  const allStoriesHot = useSelector(_ => _.story.allStoriesHot);
  const allStoriesHotPage = useSelector(_ => _.story.allStoriesHotPage);
  const allStoriesHotPageCount = useSelector(
    _ => _.story.allStoriesHotPageCount
  );

  const getAllStoriesHotLoading = useSelector(
    _ => _.story.getAllStoriesHotLoading
  );

  const getAllStoriesHotError = useSelector(_ => _.story.getAllStoriesHotError);
  const updateAllStoriesHotOptions = (prop, value) => {
    const newOptions = { ...allStoriesHotOptions, [prop]: value };
    if (prop === 'categorySlug') {
      const newCategory =
        allCategories && allCategories.length
          ? allCategories.find(item => item.slug === value)
          : null;
      if (newCategory) {
        setCategory(newCategory);
      }
    }

    dispatch(storyActions.getAllStoriesHot(newOptions));
    setAllStoriesHotOptions(newOptions);
  };
  useEffect(() => {
    const { categorySlug } = params;

    if (categorySlug) {
      updateAllStoriesHotOptions('categorySlug', categorySlug);
    }
    if (
      !getAllStoriesHotLoading &&
      (!allStoriesHot ||
        (categorySlug && allStoriesHotOptions.categorySlug !== categorySlug))
    ) {
      dispatch(
        storyActions.getAllStoriesHot({
          ...allStoriesHotOptions,
          categorySlug,
        })
      );
    }
  }, [params]);
  useEffect(() => {
    dispatch(
      configActions.setBreadcrumb([
        {
          name: `Truyện hot`,
          path: `danh-sach/hot`,
        },
      ])
    );
  }, []);
  const onChangePage = page => {
    updateAllStoriesHotOptions('page', page);
  };

  return (
    <div className="category">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <StoryThumbList
              title={`Truyện ${category.name || ''} Hot`}
              allStories={allStoriesHot}
              page={allStoriesHotPage}
              pageCount={allStoriesHotPageCount}
              onChangePage={onChangePage}
              loading={getAllStoriesHotLoading}
              error={getAllStoriesHotError}
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
                  <a href="/hot">THỂ LOẠI TRUYỆN</a>
                </h2>
              </div>
              <div className="row text-center">
                {allCategories && allCategories.length
                  ? allCategories.map(categoryItem => {
                      return (
                        <div className="col-md-6" key={categoryItem.slug}>
                          <a
                            href={`/the-loai/${categoryItem.slug}`}
                            className="p-2"
                          >
                            {categoryItem.name}
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

export default HotStory;
