import React from "react";
import { VideoContextProvider } from "../../context/VideoContext";

import "./style.css";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import Trailers from "./trailers/Trailers";
import Similar from "./similar/Similar";
import Recommended from "./recommended/Recommended";

const Details = () => {
  return (
    <VideoContextProvider>
      <div className="details">
        <DetailsBanner />
        <div id="more-details">
          <Cast />
          <Trailers />
          <Similar />
          <Recommended />
        </div>
      </div>
    </VideoContextProvider>
  );
};

export default Details;
