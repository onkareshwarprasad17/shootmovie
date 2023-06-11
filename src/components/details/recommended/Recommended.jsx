import React, { useContext } from "react";
import useFetch from "../../../redux/hooks/useFetch";
import { VideoContext } from "../../../context/VideoContext";
import TopCarousel from "../../carousel/topCarousel/TopCarousel";

const Recommended = () => {
  const { mediaType, id } = useContext(VideoContext);
  const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

  const recommendedMedia = data?.results
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
      {!!(loading || recommendedMedia?.length) && (
        <div className="recommendations">
          {recommendedMedia?.length && (
            <div className="heading" role="heading">
              <div className="title">
                Recommended{" "}
                {mediaType === "tv"
                  ? mediaType.toUpperCase() + " Show"
                  : mediaType.slice(0, 1).toUpperCase() +
                    mediaType.slice(1).toLowerCase()}
                {data?.results?.length >= 2 && "s"}
              </div>
            </div>
          )}
          <TopCarousel
            data={recommendedMedia}
            type="detail"
            isLoading={loading}
          />
        </div>
      )}
    </>
  );
};

export default Recommended;
