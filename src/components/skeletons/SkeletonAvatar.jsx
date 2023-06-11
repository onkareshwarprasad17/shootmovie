import React from "react";
import SkeletonElement from "./SkeletonElement";

const SkeletonAvatar = () => {
  return (
    <div className="skeleton-cast-card">
      <SkeletonElement type={"avatar"} />
      <SkeletonElement type={"avatar-name"} />
    </div>
  );
};

export default SkeletonAvatar;
