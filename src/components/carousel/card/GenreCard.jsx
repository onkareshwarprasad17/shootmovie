import React from 'react';

const GenreCard = ({ data }) => {
  return (
    <div
      className="genreCarousel-card"
      data-testid={'genre-card'}
      key={data?.id}
    >
      <div className="genre-name">{data?.name}</div>
    </div>
  );
};

export default GenreCard;
