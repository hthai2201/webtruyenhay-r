import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RenderList from '../general/RenderList';
const CategoryPanel = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector(_ => _.category.allCategories);
  const getAllCategoriesLoading = useSelector(
    _ => _.category.getAllCategoriesLoading
  );
  const getAllCategoriesError = useSelector(
    _ => _.category.getAllCategoriesError
  );

  return (
    <div className="panel">
      <div className="list-title">
        <h2>
          <a href="/hot">THỂ LOẠI TRUYỆN</a>
        </h2>
      </div>
      <div className="row text-center">
        <RenderList
          list={allCategories}
          loading={getAllCategoriesLoading}
          error={getAllCategoriesError}
          renderItem={category => {
            return (
              <div className="col-md-6" key={category.slug}>
                <a href={`/the-loai/${category.slug}`} className="p-2">
                  {category.name}
                </a>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default CategoryPanel;
