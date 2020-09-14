import React from 'react';
const RatingStory = ({ rate = 10 }) => {
  const RATE_TEXT = [
    {
      id: 1,
      text: 'Không còn gì để nói...',
    },
    {
      id: 2,
      text: 'WTF',
    },
    {
      id: 3,
      text: 'Cái gì thế này ?!',
    },
    {
      id: 4,
      text: 'Haizz',
    },
    {
      id: 5,
      text: 'Tạm',
    },
    {
      id: 6,
      text: 'Cũng được',
    },
    {
      id: 7,
      text: 'Khá đấy',
    },
    {
      id: 8,
      text: 'Được',
    },
    {
      id: 9,
      text: 'Hay',
    },
    {
      id: 10,
      text: 'Tuyệt đỉnh!',
    },
  ];

  return (
    <div className="rate">
      {RATE_TEXT.map((item, itemIndex) => {
        return (
          <div
            key={item.id}
            className={`text-truncate rate__item rate__item--${
              rate < item.id ? 'off' : 'on'
            }`}
          >
            <em className="desc "> {item.text}</em>
          </div>
        );
      })}
    </div>
  );
};

export default RatingStory;
