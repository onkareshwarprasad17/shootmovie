import React from "react";
import SkeletonCarousel from "../skeletons/SkeletonCarousel";
import TrailerCard from "./card/TrailerCard";

const TrailerCarousel = ({ isLoading, data }) => {
  return (
    <>
      {!isLoading ? (
        data?.map((item) => <TrailerCard data={item} key={item.id} />)
      ) : (
        <SkeletonCarousel type="trailers" />
      )}
    </>
  );
};

export default TrailerCarousel;
