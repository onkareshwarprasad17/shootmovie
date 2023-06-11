import React from "react";
import SkeletonElement from "./SkeletonElement";

const SkeletonDetailCard = () => {
  return (
    <div className="skeleton-detail-card">
      <div className="genre-list">
        <SkeletonElement type={"genre"} />
        <SkeletonElement type={"genre"} />
      </div>
      <div className="text-container">
        <SkeletonElement type={"title"} />
        <SkeletonElement type={"text"} />
        <SkeletonElement type={"text"} />
      </div>
    </div>
  );
};

export default SkeletonDetailCard;
