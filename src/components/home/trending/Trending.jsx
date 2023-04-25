import React, { memo, useEffect, useState } from 'react';
import useFetch from '../../../redux/hooks/useFetch';
import TopCarousel from '../../carousel/topCarousel/TopCarousel';

const Trending = () => {
  const [mediaType, setMediaType] = useState('movie');
  const { data } = useFetch(`/trending/${mediaType}/week`);
  const [trendingMovies, setTrendingMovies] = useState(null);

  const handleMediaType = (mediaType) => {
    setMediaType(mediaType);
  };

  useEffect(() => {
    setTrendingMovies(data?.results);
  }, [data]);

  return (
    <div className="trending">
      <div className="heading">
        <div className="title">Trending</div>
        <div className="media-types">
          <span
            className={`movie${mediaType === 'movie' && ' active'}`}
            onClick={() => handleMediaType('movie')}
          >
            Movies
          </span>
          <span
            className={`tv${mediaType === 'tv' && ' active'}`}
            onClick={() => handleMediaType('tv')}
          >
            TV Shows
          </span>
        </div>
      </div>
      <TopCarousel data={trendingMovies} type={'detail'} />
    </div>
  );
};

export default memo(Trending);
