import React from "react";
import SkeletonDetailCard from "./SkeletonDetailCard";
import SkeletonUpcomingCard from "./SkeletonUpcomingCard";
import SkeletonAvatar from "./SkeletonAvatar";
import SkeletonTrailer from "./SkeletonTrailer";

const SkeletonCarousel = ({ type }) => {
  return (
    <>
      {type === "detail" && (
        <>
          <SkeletonDetailCard />
          <SkeletonDetailCard />
          <SkeletonDetailCard />
          <SkeletonDetailCard />
        </>
      )}
      {type === "upcoming" && (
        <>
          <SkeletonUpcomingCard />
        </>
      )}
      {type === "cast" && (
        <>
          <SkeletonAvatar />
          <SkeletonAvatar />
          <SkeletonAvatar />
        </>
      )}

      {type === "trailers" && (
        <>
          <SkeletonTrailer />
          <SkeletonTrailer />
          <SkeletonTrailer />
        </>
      )}
    </>
  );
};

export default SkeletonCarousel;
