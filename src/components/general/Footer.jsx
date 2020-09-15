import React from 'react';
import { Link } from 'react-router-dom';

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
                      // eslint-disable-next-line react/no-array-index-key
                      <li key={index}>
                        <Link to="/" className="footer__tag">
                          {result.name}
                        </Link>
                      </li>
                    );
                  })
                : null}
              <li className="text-right pull-right">
                <Link to="https://truyenfull.vn/contact/" title="Contact">
                  Contact
                </Link>{' '}
                -{' '}
                <Link to="https://truyenfull.vn/tos/" title="Terms of Service">
                  ToS
                </Link>
                <Link
                  className="backtop"
                  title="Trở lên đầu trang"
                  to="#wrap"
                  rel="nofollow"
                  aria-label="Trở về đầu trang"
                >
                  <span className="glyphicon glyphicon-upload"></span>
                </Link>{' '}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
