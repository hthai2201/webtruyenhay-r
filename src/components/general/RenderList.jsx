import React from 'react';
import Loading from './Loading';

const RenderList = ({
  list,
  emptyList,
  loading,
  error,
  renderItem = () => null,
}) => {
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  if (!list) {
    return null;
  }
  if (!list.length) {
    return emptyList ? (
      emptyList()
    ) : (
      <div className="alert alert-warning">Danh sách trống</div>
    );
  }

  return list.map(renderItem);
};

export default RenderList;
