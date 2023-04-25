import React, { memo } from 'react';
import DetailCard from '../card/DetailCard';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './style.css';
import GenreCard from '../card/GenreCard';
import CastCard from '../../details/cast/card/CastCard';
import TrailerCard from '../card/TrailerCard';

const TopCarousel = ({ data, type }) => {
  return (
    <div className="carousel-container">
      <div className="left-arrow">
        <LeftOutlined />
      </div>
      <div className="right-arrow">
        <RightOutlined />
      </div>
      <div className="top-carousel">
        {type === 'genre' &&
          data?.map((item) => <GenreCard data={item} key={item.id} />)}
        {type === 'cast' &&
          data?.map((item) => (
            <CastCard data={item} key={item.id || item.cast_id} />
          ))}
        {type === 'trailers' &&
          data?.map((item) => <TrailerCard data={item} key={item.id} />)}

        {type === 'detail' &&
          data?.map((item) => <DetailCard data={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default memo(TopCarousel);
