import React, { useEffect } from 'react';
import './style.css';

const ProgressBar = ({ currentSlide }) => {
  useEffect(() => {
    const ratingIndicator = document.querySelector(
      `.progress-bar-indicator-${currentSlide?.id}`
    );
    const radius = ratingIndicator?.r?.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset =
      circumference - (currentSlide?.vote_average / 10) * circumference;
    ratingIndicator.style.strokeDasharray = `${circumference}, ${circumference}`;
    ratingIndicator.style.strokeDashoffset = offset;
  }, [currentSlide]);

  return (
    <svg className="progress-bar" viewBox="0 0 120 120">
      <circle
        className="progress-bar-background"
        cx={'60'}
        cy={'60'}
        r={'50'}
      ></circle>
      <circle
        className={`progress-bar-indicator progress-bar-indicator-${currentSlide?.id}`}
        cx={'60'}
        cy={'60'}
        r={'50'}
      ></circle>
      <text className="progress-bar-text" x={'60'} y={'70'}>
        {currentSlide?.vote_average}
      </text>
    </svg>
  );
};

export default ProgressBar;
