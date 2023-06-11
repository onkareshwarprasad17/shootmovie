import React from "react";
import { useSelector } from "react-redux";
import TopCarousel from "../../carousel/topCarousel/TopCarousel";

const Explore = () => {
  const { genres } = useSelector((state) => state.app);

  return (
    <>
      {genres.length && (
        <div className="explore">
          <div className="heading">
            <div className="title">Explore by Genres</div>
            <div className="more">More</div>
          </div>
          <TopCarousel data={genres} type={"genre"} />
        </div>
      )}
    </>
  );
};

export default Explore;
