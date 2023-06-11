import React, { useContext } from "react";
import { VideoContext } from "../../../context/VideoContext";
import TopCarousel from "../../carousel/topCarousel/TopCarousel";

const Trailers = () => {
  const { videos, videoIsLoading } = useContext(VideoContext);

  return (
    <>
      {!!(videoIsLoading || videos?.length) && (
        <div className="trailers">
          {videos?.length && (
            <div className="heading" role="heading">
              <div className="title">Official Videos</div>
            </div>
          )}

          <TopCarousel
            data={videos}
            type="trailers"
            isLoading={videoIsLoading}
          />
        </div>
      )}
    </>
  );
};

export default Trailers;
