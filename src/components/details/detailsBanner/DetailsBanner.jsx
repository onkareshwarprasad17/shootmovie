import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DownCircleOutlined } from "@ant-design/icons";

import useFetch from "../../../redux/hooks/useFetch";
import { VideoContext } from "../../../context/VideoContext";

import "./style.css";

import ProgressBar from "../../progressBar/ProgressBar";
import SkeletonDetailBanner from "../../skeletons/SkeletonDetailBanner";

import PosterFallback from "../../../assets/no-image-poster.png";

const MAX_LINES = 250;

const DetailsBanner = () => {
  const { url } = useSelector((state) => state.app);

  const { mediaType, id } = useContext(VideoContext);

  const { data: mediaData, loading: mediaIsLoading } = useFetch(
    `/${mediaType}/${id}`
  );

  const [bannerDetails, setBannerDetails] = useState(null);
  const [showEllipsis, setShowEllipsis] = useState(false);
  const [modifiedOverview, setModifiedOverview] = useState("");

  useEffect(() => {
    setBannerDetails({
      ...bannerDetails,
      backdropImg: mediaData?.backdrop_path,
      posterImg: mediaData?.poster_path,
      title: mediaData?.original_title || mediaData?.original_name,
      overview: mediaData?.overview,
      year: new Date(
        mediaData?.release_date || mediaData?.first_air_date
      ).getFullYear(),
      genres: mediaData?.genres,
      vote_average: mediaData?.vote_average?.toFixed(1),
    });

    if (mediaData?.overview?.length > MAX_LINES) {
      setModifiedOverview(
        (prev) => (prev = mediaData.overview.slice(0, MAX_LINES))
      );
      setShowEllipsis(true);
    } else {
      setModifiedOverview(mediaData?.overview);
      setShowEllipsis(false);
    }
  }, [mediaData]);

  const showMore = () => {
    const mediaDetailsSection = document.querySelector("#more-details");

    mediaDetailsSection.scrollIntoView({
      behavior: "smooth",
    });
  };

  const showFullOverview = () => {
    setShowEllipsis(false);
    setModifiedOverview(bannerDetails?.overview);
  };

  return (
    <>
      <div className="details-banner" data-testid={"details-banner"}>
        <div className="backdrop-image">
          {bannerDetails?.backdropImg && (
            <img src={url.backdrop + bannerDetails?.backdropImg} alt="" />
          )}
        </div>
        <div className="opacity-layer"></div>

        <div className="content-wrapper">
          <div className="content">
            {!mediaIsLoading && (
              <>
                <section className="left">
                  <div className="heading">
                    {bannerDetails?.title}
                    <span className="sub-heading">{bannerDetails?.year}</span>
                  </div>
                  <div className={`overview`} data-testid={"overview"}>
                    {modifiedOverview}
                    {!!showEllipsis && (
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
                    {bannerDetails?.genres?.map((genre) => (
                      <div
                        className="genre"
                        key={genre.id}
                        data-testid={"genre-badge"}
                      >
                        {genre.name}
                      </div>
                    ))}
                  </div>

                  <div className="show-more" onClick={() => showMore()}>
                    More Details
                    <span>
                      <DownCircleOutlined />
                    </span>
                  </div>
                </section>
                <section className="right">
                  <img
                    src={`${url?.poster + bannerDetails?.posterImg}`}
                    onError={(e) => {
                      e.target.src = `${PosterFallback}`;
                    }}
                    alt=""
                    data-testid={"poster"}
                  />
                  <div className="progress-bar-svg">
                    <ProgressBar
                      rating={bannerDetails?.vote_average}
                      currentSlide={bannerDetails}
                    />
                  </div>
                </section>
              </>
            )}
            {mediaIsLoading && <SkeletonDetailBanner />}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsBanner;
