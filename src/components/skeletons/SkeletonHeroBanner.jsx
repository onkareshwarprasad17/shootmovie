import React from 'react';
import SkeletonElement from './SkeletonElement';

const SkeletonHeroBanner = () => {
  return (
    <div className="skeleton-hero">
      <div className="card">
        <div className="text-container">
          <SkeletonElement type={'title'} />
          <SkeletonElement type={'text'} />
          <SkeletonElement type={'text'} />
        </div>
        <div className="progress-bar">
          <SkeletonElement type={'progress-bar'} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonHeroBanner;
