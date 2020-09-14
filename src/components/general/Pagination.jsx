import React, { useState } from 'react';
import { min } from 'moment';
const Pagination = ({
  page,
  pageCount,
  onClick,
  className,
  align,
  pageNeighbor = 5,
}) => {
  const getPaginationItemIndex = (currentIndex, offset, minIndex, maxIndex) => {
    let left = currentIndex - minIndex;
    let right = maxIndex - currentIndex;

    if (left < 0) return null;
    if (right > 0) {
      if (left < offset) {
        right = offset + left;
      }
      if (right < offset) {
        left = pageNeighbor + right;
      }
    } else {
      left = minIndex;
      right = maxIndex;
    }

    const start = Math.max(left, currentIndex - pageNeighbor, minIndex);
    const end = Math.min(right, currentIndex + pageNeighbor, maxIndex);
    const leftSpace = start > 2;
    const first = start > 1;
    const rightSpace = end < maxIndex - 1;
    const last = end < maxIndex;

    const result = [];
    if (first) {
      result.push(1);
    }
    if (leftSpace) {
      result.push('...');
    }
    for (let i = start; i <= end; i += 1) {
      result.push(i);
    }
    if (rightSpace) {
      result.push('...');
    }
    if (first) {
      result.push(1);
    }
    if (last) {
      result.push(maxIndex);
    }
    return result;
  };
  const toPage = (e, index) => {
    e.preventDefault();
    onClick(index);
  };
  return (
    <nav className={className}>
      <ul
        className={`pagination ${
          align === 'center' ? 'justify-content-center' : ''
        }`}
      >
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <a
            onClick={() => toPage(e, page - 1)}
            className="page-link"
            href="./"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {getPaginationItemIndex(page, pageNeighbor, 1, pageCount).map(i => {
          return (
            <li
              key={i}
              className={`page-item ${page === i ? 'active' : ''} ${
                i === '...' ? 'disabled' : ''
              }`}
            >
              <a onClick={e => toPage(e, i)} className="page-link" href="./">
                {i}
              </a>
            </li>
          );
        })}

        <li className={`page-item ${page === pageCount ? 'disabled' : ''}`}>
          <a
            onClick={e => toPage(e, page + 1)}
            className="page-link"
            href="./"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
