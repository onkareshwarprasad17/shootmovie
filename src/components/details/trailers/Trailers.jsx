import React, { memo, useEffect, useState } from 'react';
import TopCarousel from '../../carousel/topCarousel/TopCarousel';
import { useParams } from 'react-router-dom';
import useFetch from '../../../redux/hooks/useFetch';

const Trailers = ({ mediaType, id }) => {
  const { data } = useFetch(`/${mediaType}/${id}/videos`);

  const videos = data?.results?.filter((item) =>
    item?.name?.match(/trailer/gi)
  );

  return (
    <>
      {videos && videos.length ? (
        <div className="trailers">
          <div className="heading" role="heading">
            <div className="title">Official Videos</div>
          </div>
          <TopCarousel data={videos} type="trailers" />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default memo(Trailers);
