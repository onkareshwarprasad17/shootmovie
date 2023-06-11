import React from "react";
import ProgressBar from "../progressBar/ProgressBar";
import SkeletonElement from "./SkeletonElement";

const SkeletonDetailBanner = () => {
  return (
    <>
      <section className="skeleton-detail-banner left">
        <SkeletonElement type={"title"} />
        <SkeletonElement type={"text"} />
        <SkeletonElement type={"text"} />
        <SkeletonElement type={"text"} />
        <SkeletonElement type={"text"} />

        <div className="genres-list">
          <SkeletonElement type={"genre"} />
          <SkeletonElement type={"genre"} />
        </div>
      </section>
      <section className="right">
        <div className="skeleton-poster">
          <div className="progress-bar-svg">
            <ProgressBar currentSlide={null} />
          </div>
        </div>
      </section>
    </>
  );
};

export default SkeletonDetailBanner;
