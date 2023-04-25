import React, { lazy, memo, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../redux/hooks/useFetch';
import DetailsBanner from './detailsBanner/DetailsBanner';

import './style.css';
import Cast from './cast/Cast';
import Trailers from './trailers/Trailers';
import Similar from './similar/Similar';
import Recommended from './recommended/Recommended';

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { data: castData, loading: castLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  const [bannerDetails, setBannerDetails] = useState(null);
  const [castDetails, setCastDetails] = useState(null);

  useEffect(() => {
    setBannerDetails({
      ...bannerDetails,
      backdropImg: data?.backdrop_path,
      posterImg: data?.poster_path,
      title: data?.original_title || data?.original_name,
      overview: data?.overview,
      year: new Date(data?.release_date || data?.first_air_date).getFullYear(),
      genres: data?.genres,
      vote_average: data?.vote_average?.toFixed(1),
    });

    setCastDetails(castData?.cast?.slice(0, 10));
  }, [data, castData]);

  return (
    <div className="details">
      <DetailsBanner data={bannerDetails} />
      <div id="more-details">
        <Cast data={castDetails} />
        <Trailers mediaType={mediaType} id={id} />
        <Similar mediaType={mediaType} id={id} />
        <Recommended mediaType={mediaType} id={id} />
      </div>
    </div>
  );
};

export default memo(Details);
