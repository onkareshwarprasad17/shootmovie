import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FallBackBackdrop from "../../../assets/no-image.png";

const DetailCard = ({ data }) => {
  const { url, genres } = useSelector((state) => state.app);
  const [dataGenres, setDataGenres] = useState(null);

  useEffect(() => {
    if (genres?.length) {
      const genreData = data?.genre_ids?.map((id) =>
        genres.find((genre) => genre.id === id)
      );
      setDataGenres(genreData);
    }
  }, [genres, data]);

  return (
    <Link
      className="sectionCarousel-card"
      key={data?.id}
      to={`/${data?.media_type}/${data?.id}`}
      data-testid={"sectionCarousel-card"}
    >
      <span className="card-image">
        {data?.backdrop_path ? (
          <img
            src={url.backdrop + data?.backdrop_path}
            alt={`trending-${data?.id}`}
          />
        ) : (
          <img src={FallBackBackdrop} alt="fallback-image" />
        )}
      </span>
      <div className="genres-list">
        {dataGenres?.map((genre, index) => {
          if (index <= 1) {
            return (
              <div className="genre" key={genre.id}>
                {genre.name.length > 10
                  ? `${genre.name.slice(0, 10)}...`
                  : genre.name}
              </div>
            );
          } else if (index > 1 && index === dataGenres?.length - 1) {
            return (
              <div className="genre genre-extra" key={genre.id}>
                ...
              </div>
            );
          }
        })}
      </div>
      <div className="text">
        <div className="title">{data?.title || data?.name}</div>
        <div className="overview">{data?.overview}</div>
      </div>
    </Link>
  );
};

export default DetailCard;
