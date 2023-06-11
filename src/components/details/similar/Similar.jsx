import React, { useContext } from "react";
import useFetch from "../../../redux/hooks/useFetch";
import { VideoContext } from "../../../context/VideoContext";
import TopCarousel from "../../carousel/topCarousel/TopCarousel";

const Similar = () => {
  const { mediaType, id } = useContext(VideoContext);
  let { data, loading } = useFetch(`/${mediaType}/${id}/similar`);

  const similarMedia = data?.results
    ?.map((item) => {
      if (!item.hasOwnProperty("media_type")) {
        return {
          ...item,
          media_type: mediaType,
        };
      } else {
        return item;
      }
    })
    ?.slice(0, 10);

  return (
    <>
      {!!(loading || similarMedia?.length) && (
        <div className="similar">
          {similarMedia?.length && (
            <div className="heading" role="heading">
              <div className="title">
                {`Similar ${
                  mediaType === "tv"
                    ? mediaType.toUpperCase() + " Show"
                    : mediaType.slice(0, 1).toUpperCase() +
                      mediaType.slice(1).toLowerCase()
                }${data?.results?.length >= 2 ? "s" : ""}`}
              </div>
            </div>
          )}
          <TopCarousel
            data={similarMedia}
            type={"detail"}
            isLoading={loading}
          />
        </div>
      )}
    </>
  );
};

export default Similar;
