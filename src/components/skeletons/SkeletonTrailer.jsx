import React from "react";
import SkeletonElement from "./SkeletonElement";

const SkeletonTrailer = () => {
  return (
    <div className="skeleton-trailer-card">
      <SkeletonElement type={"play-button"} />
    </div>
  );
};

export default SkeletonTrailer;
