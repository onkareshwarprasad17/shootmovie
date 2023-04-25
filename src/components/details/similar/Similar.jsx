import React, { memo, useEffect, useState } from 'react';
import useFetch from '../../../redux/hooks/useFetch';
import TopCarousel from '../../carousel/topCarousel/TopCarousel';

const Similar = ({ mediaType, id }) => {
  let { data } = useFetch(`/${mediaType}/${id}/similar`);

  const similarMedia = data?.results
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
      {similarMedia && similarMedia.length ? (
        <div className="similar">
          <div className="heading" role="heading">
            <div className="title">
              {`Similar ${
                mediaType === 'tv'
                  ? mediaType.toUpperCase() + ' Show'
                  : mediaType.slice(0, 1).toUpperCase() +
                    mediaType.slice(1).toLowerCase()
              }${data?.results?.length >= 2 ? 's' : ''}`}
            </div>
          </div>

          <TopCarousel data={similarMedia} type={'detail'} />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default memo(Similar);
