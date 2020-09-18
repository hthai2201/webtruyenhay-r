import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Breadcrumb = () => {
  const location = useLocation();
  const breadcrumbList = useSelector(_ => _.config.breadcrumbList) || [];

  let baseLink = '/';
  return (
    <nav aria-label="breadcrumb ">
      <ol className="breadcrumb bg-none">
        {location.pathname === '/' ? (
          <li className="breadcrumb-item">
            Đọc truyện online, đọc truyện chữ, truyện full, truyện hay. Tổng hợp
            đầy đủ và cập nhật liên tục.
          </li>
        ) : (
          <>
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fa fa-home mr-1 " aria-hidden="true"></i>Truyện
              </Link>
            </li>
            {breadcrumbList.map(item => {
              baseLink = baseLink + item.path + '/';
              return (
                <li key={item.path} className="breadcrumb-item">
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
