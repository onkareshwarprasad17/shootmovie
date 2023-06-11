import React, { useContext, useEffect, useState } from "react";

import useFetch from "../../../redux/hooks/useFetch";
import { VideoContext } from "../../../context/VideoContext";
import TopCarousel from "../../carousel/topCarousel/TopCarousel";

const Cast = () => {
  // Fetching Cast Data
  const { mediaType, id } = useContext(VideoContext);

  const { data: castData, loading: castLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  const [castDetails, setCastDetails] = useState(null);

  useEffect(() => {
    setCastDetails(castData?.cast?.slice(0, 10));
  }, [castData]);

  return (
    <>
      {!!(castLoading || castDetails?.length) && (
        <div className="cast">
          {castDetails?.length && (
            <div className="heading">
              <div className="title">Cast</div>
            </div>
          )}
          <TopCarousel
            data={castDetails}
            type={"cast"}
            isLoading={castLoading}
          />
        </div>
      )}
    </>
  );
};

export default Cast;
