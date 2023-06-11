import React from "react";
import DetailCard from "./card/DetailCard";
import SkeletonCarousel from "../skeletons/SkeletonCarousel";

const DetailCarousel = ({ isLoading, data }) => {
  return (
    <>
      {!isLoading ? (
        data?.map((item) => <DetailCard data={item} key={item.id} />)
      ) : (
        <SkeletonCarousel type="detail" />
      )}
    </>
  );
};

export default DetailCarousel;
