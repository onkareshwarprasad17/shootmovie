import React from "react";
import SkeletonElement from "./SkeletonElement";
import ProgressBar from "../progressBar/ProgressBar";

const SkeletonHeroBannerCard = () => {
  return (
    <>
      <div className="carousel-card active">
        <div className="skeleton-hero-card-image"></div>
        <div className="progress-bar-svg">
          <ProgressBar currentSlide={null} />
        </div>
        <div className="carousel-text">
          <SkeletonElement type={"title"} />
          <SkeletonElement type={"text"} />
        </div>
      </div>
      <div className="carousel-card">
        <div className="skeleton-hero-card-image"></div>
        <div className="progress-bar-svg">
          <ProgressBar currentSlide={null} />
        </div>
        <div className="carousel-text">
          <SkeletonElement type={"title"} />
          <SkeletonElement type={"text"} />
        </div>
      </div>
    </>
  );
};

export default SkeletonHeroBannerCard;
