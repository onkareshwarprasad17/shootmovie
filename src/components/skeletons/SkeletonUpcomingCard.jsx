import React from 'react';
import SkeletonElement from './SkeletonElement';

const SkeletonUpcomingCard = () => {
  return (
    <div className="skeleton-upcoming-card">
      <SkeletonElement type={'text'} />
    </div>
  );
};

export default SkeletonUpcomingCard;
