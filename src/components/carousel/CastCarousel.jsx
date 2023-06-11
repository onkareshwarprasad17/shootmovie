import React from "react";
import CastCard from "../details/cast/card/CastCard";
import SkeletonCarousel from "../skeletons/SkeletonCarousel";

const CastCarousel = ({ isLoading, data }) => {
  return (
    <>
      {!isLoading ? (
        data?.map((item) => (
          <CastCard data={item} key={item.id || item.cast_id} />
        ))
      ) : (
        <SkeletonCarousel type="cast" />
      )}
    </>
  );
};

export default CastCarousel;
