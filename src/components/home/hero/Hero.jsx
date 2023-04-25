import React, { useEffect, useRef, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import useFetch from '../../../redux/hooks/useFetch';
import ProgressBar from '../../progressBar/ProgressBar';

import './style.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { url } = useSelector((state) => state.app);
  const { data } = useFetch('/movie/popular');

  const carouselContainer = useRef(null);
  const [movies, setMovies] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (data?.results) {
      setMovies(data?.results?.slice(0, 5));
    }
  }, [data]);

  const showPrevSlide = () => {
    const container = carouselContainer.current;
    const width = container.children[0].offsetWidth;
    let nextSlide = currentSlide;

    if (currentSlide == 0) {
      nextSlide = movies?.length - 1;
      container.scrollLeft = width * movies?.length;
    } else {
      nextSlide -= 1;
      container.scrollLeft = container.scrollLeft - width + 10;
    }

    setCurrentSlide(nextSlide);
  };

  const showNextSlide = () => {
    const container = carouselContainer.current;
    const width = container.children[0].offsetWidth;
    let nextSlide = currentSlide;

    if (currentSlide == movies?.length - 1) {
      nextSlide = 0;
      container.scrollLeft = 0;
    } else {
      nextSlide += 1;
      container.scrollLeft = container.scrollLeft + width + 20;
    }
    setCurrentSlide(nextSlide);
  };

  return (
    <>
      <div className="heroCarousel">
        {movies?.map(
          (movie, index) =>
            index === currentSlide && (
              <img
                src={url.backdrop + movie?.backdrop_path}
                alt={`movie-${movie?.id}`}
                key={index}
                data-testid={'backdrop-image'}
              />
            )
        )}
        <div className="left-arrow">
          <span>
            <LeftOutlined onClick={showPrevSlide} data-testid={'left-arrow'} />
          </span>
        </div>
        <div className="right-arrow">
          <span>
            <RightOutlined
              onClick={showNextSlide}
              data-testid={'right-arrow'}
            />
          </span>
        </div>

        <div className="carousel-items" ref={carouselContainer}>
          {movies?.map((movie, index) => (
            <Link
              to={`/movie/${movie.id}`}
              className={`carousel-card${
                index === currentSlide ? ' active' : ''
              }`}
              key={index}
              data-testid={'heroCarousel-card'}
            >
              <img
                src={url.backdrop + movie?.backdrop_path}
                alt={`movie-${movie?.id}`}
                data-testid={'card-image'}
              />
              <div className="progress-bar-svg">
                <ProgressBar
                  rating={movie?.vote_average}
                  currentSlide={movie}
                />
              </div>
              <div className="carousel-text">
                <div className="carousel-title">{movie?.original_title}</div>
                <div className="carousel-overview">{movie?.overview}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="dots-container">
          {movies?.map((_, index) => (
            <div
              className={`dot${index === currentSlide ? ' active' : ''}`}
              key={`dot-${index}`}
              data-testid={`dot-${index}`}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default React.memo(Hero);
