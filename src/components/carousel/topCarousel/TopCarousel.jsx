import React, { memo } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import DetailCarousel from "../DetailCarousel";
import GenreCard from "../card/GenreCard";
import CastCarousel from "../CastCarousel";
import TrailerCarousel from "../TrailerCarousel";

import "./style.css";

const TopCarousel = ({ data, type, isLoading }) => {
  return (
    <>
      {!!(isLoading || data?.length) && (
        <div className="carousel-container">
          <div className="left-arrow">
            <LeftOutlined />
          </div>
          <div className="right-arrow">
            <RightOutlined />
          </div>
          <div className="top-carousel">
            {type === "detail" && (
              <DetailCarousel data={data} isLoading={isLoading} />
            )}
            {type === "genre" &&
              data?.map((item) => <GenreCard data={item} key={item.id} />)}
            {type === "cast" && (
              <CastCarousel data={data} isLoading={isLoading} />
            )}
            {type === "trailers" && (
              <TrailerCarousel data={data} isLoading={isLoading} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(TopCarousel);
