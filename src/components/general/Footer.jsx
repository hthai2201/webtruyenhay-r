import React, { Component } from 'react';

const Footer = ({ allCategories = [] }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-5">
            <p>
              <b>Truyện Hay</b> - Đọc truyện online, đọc truyện chữ, truyện hay.
              Website luôn cập nhật những bộ truyện mới thuộc các thể loại đặc
              sắc như truyện tiên hiệp, truyện kiếm hiệp, hay truyện ngôn tình
              một cách nhanh nhất. Hỗ trợ mọi thiết bị như di động và máy tính
              bảng.
            </p>
          </div>
          <div className="col-sm-7">
            <ul className="footer__tags">
              {allCategories.length
                ? allCategories.map((result, index) => {
                    return (
                      <li key={index}>
                        <a href="/" className="footer__tag">
                          {result.name}
                        </a>
                      </li>
                    );
                  })
                : null}
              <li className="text-right pull-right">
                <a href="https://truyenfull.vn/contact/" title="Contact">
                  Contact
                </a>{' '}
                -{' '}
                <a href="https://truyenfull.vn/tos/" title="Terms of Service">
                  ToS
                </a>
                <a
                  className="backtop"
                  title="Trở lên đầu trang"
                  href="#wrap"
                  rel="nofollow"
                  aria-label="Trở về đầu trang"
                >
                  <span className="glyphicon glyphicon-upload"></span>
                </a>{' '}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
