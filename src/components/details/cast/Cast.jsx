import React, { memo } from 'react';
import TopCarousel from '../../carousel/topCarousel/TopCarousel';

const Cast = ({ data }) => {
  return (
    <>
      {data && (
        <div className="cast">
          <div className="heading">
            <div className="title">Cast</div>
          </div>
          <TopCarousel data={data} type={'cast'} />
        </div>
      )}
    </>
  );
};

export default memo(Cast);
