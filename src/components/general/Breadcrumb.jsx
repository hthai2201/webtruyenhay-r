import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
const Breadcrumb = () => {
  const location = useLocation();
  const breadcrumbList = useSelector(_ => _.config.breadcrumbList) || [];

  let baseLink = '/';
  return (
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        {location.pathname === '/' ? (
          <li className="breadcrumb-item">
            Đọc truyện online, đọc truyện chữ, truyện full, truyện hay. Tổng hợp
            đầy đủ và cập nhật liên tục.
          </li>
        ) : (
          <>
            <li class="breadcrumb-item">
              <Link to="/">
                <i class="fa fa-home mr-1 " aria-hidden="true"></i>Truyện
              </Link>
            </li>
            {breadcrumbList.map(item => {
              baseLink = baseLink + item.path + '/';
              return (
                <li key={item.path} class="breadcrumb-item">
                  <Link to={baseLink}>{item.name}</Link>
                </li>
              );
            })}
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
