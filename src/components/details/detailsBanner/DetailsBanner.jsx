import React, { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { DownCircleOutlined } from '@ant-design/icons';
import PosterFallback from '../../../assets/no-image-poster.png';
import './style.css';
import ProgressBar from '../../progressBar/ProgressBar';

const DetailsBanner = ({ data }) => {
  const { url } = useSelector((state) => state.app);
  const [showEllipsis, setShowEllipsis] = useState(false);
  const [modifiedData, setModifiedData] = useState('');
  const MAX_LINES = 250;

  useEffect(() => {
    if (data?.overview?.length > MAX_LINES) {
      setModifiedData((prev) => (prev = data?.overview?.slice(0, MAX_LINES)));
      setShowEllipsis(true);
    } else {
      setModifiedData(data?.overview);
      setShowEllipsis(false);
    }
  }, [data]);

  const showMore = () => {
    const mediaDetailsSection = document.querySelector('#more-details');

    mediaDetailsSection.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const showFullOverview = () => {
    setShowEllipsis(false);
    setModifiedData(data?.overview);
  };

  return (
    <>
      {data && (
        <div className="details-banner" data-testid={'details-banner'}>
          <div className="backdrop-image">
            {data?.backdropImg && (
              <img src={url.backdrop + data?.backdropImg} alt="" />
            )}
          </div>
          <div className="opacity-layer"></div>

          <div className="content-wrapper">
            <div className="content">
              <section className="left">
                <div className="heading">
                  {data?.title}
                  <span className="sub-heading">{data?.year}</span>
                </div>
                <div className={`overview`} data-testid={'overview'}>
                  {modifiedData}
                  {showEllipsis && (
                    <span
                      className="ellipsis"
                      data-testid="ellipsis"
                      onClick={() => showFullOverview()}
                    >
                      ...
                    </span>
                  )}
                </div>
                <div className="genres-list">
                  {data?.genres?.map((genre) => (
                    <div
                      className="genre"
                      key={genre.id}
                      data-testid={'genre-badge'}
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>
                <div className="trailer">
                  <span className="play-button"></span> Watch Trailer
                </div>
                <div className="show-more" onClick={() => showMore()}>
                  More Details
                  <span>
                    <DownCircleOutlined />
                  </span>
                </div>
              </section>
              <section className="right">
                <>
                  <img
                    src={`${url?.poster + data?.posterImg}`}
                    onError={(e) => {
                      e.target.src = `${PosterFallback}`;
                    }}
                    alt=""
                    data-testid={'poster'}
                  />
                  <div className="progress-bar-svg">
                    <ProgressBar
                      rating={data?.vote_average}
                      currentSlide={data}
                    />
                  </div>
                </>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(DetailsBanner);
