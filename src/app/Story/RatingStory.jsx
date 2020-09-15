import React from 'react';
import { RATE_TEXT } from '../../_constants/story.constants';

const RatingStory = ({ rate = 10, onClick = () => null, disabled }) => {
  return (
    <div className={`rate ${disabled ? 'no-click' : ''}`}>
      {RATE_TEXT.map(item => {
        return (
          <div
            role="presentation"
            key={item.id}
            onClick={() => onClick(item.id)}
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
