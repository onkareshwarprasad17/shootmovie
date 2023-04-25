import React, { memo, useEffect, useState } from 'react';
import useFetch from '../../../redux/hooks/useFetch';
import TopCarousel from '../../carousel/topCarousel/TopCarousel';

const Recommended = ({ mediaType, id }) => {
  const { data } = useFetch(`/${mediaType}/${id}/recommendations`);

  const recommendedMedia = data?.results
    ?.map((item) => {
      if (!item.hasOwnProperty('media_type')) {
        return {
          ...item,
          media_type: mediaType,
        };
      } else {
        return item;
      }
    })
    ?.slice(0, 10);

  return (
    <>
      {recommendedMedia && recommendedMedia.length ? (
        <div className="recommendations">
          <div className="heading" role="heading">
            <div className="title">
              Recommended{' '}
              {mediaType === 'tv'
                ? mediaType.toUpperCase() + ' Show'
                : mediaType.slice(0, 1).toUpperCase() +
                  mediaType.slice(1).toLowerCase()}
              {data?.results?.length >= 2 && 's'}
            </div>
          </div>
          <TopCarousel data={recommendedMedia} type="detail" />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default memo(Recommended);
