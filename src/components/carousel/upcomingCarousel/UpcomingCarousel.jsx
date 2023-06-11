import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import useFetch from "../../../redux/hooks/useFetch";
import SkeletonCarousel from "../../skeletons/SkeletonCarousel";

import "./style.css";

const UpcomingCarousel = () => {
  const { url } = useSelector((state) => state.app);
  const { data, loading } = useFetch("/movie/upcoming");
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  useEffect(() => {
    setUpcomingMovies(data?.results?.slice(0, 5));
  }, [data]);

  return (
    <>
      {loading ? (
        <SkeletonCarousel type="upcoming" />
      ) : (
        <div className="upcoming-carousel">
          <div className="carousel-items">
            {upcomingMovies?.map((movie) => (
              <Link
                className="carousel-item"
                key={movie.id}
                to={`/movie/${movie.id}`}
              >
                <img src={url.backdrop + movie.backdrop_path} alt="" />
                <span className="text">{movie.original_title}</span>
                <div className="opacity-layer"></div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(UpcomingCarousel);
