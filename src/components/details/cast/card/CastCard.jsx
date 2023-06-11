import React from "react";
import { useSelector } from "react-redux";
import CastFallback from "../../../icons/castProfile/CastFallback";

import "./style.css";

const CastCard = ({ data: castDetails }) => {
  const { url } = useSelector((state) => state.app);

  return (
    <div className="cast-card" key={castDetails.original_name}>
      <div className="profile-image">
        <div className="image">
          {castDetails?.profile_path ? (
            <img
              src={`${url.profile + castDetails?.profile_path}`}
              alt="profile-image"
            />
          ) : (
            <CastFallback />
          )}
        </div>
      </div>
      <div className="cast-details">
        <div className="character-name">
          {castDetails?.character?.split("/")[0].trim()}
        </div>
        <div className="original-name">{castDetails?.original_name}</div>
      </div>
    </div>
  );
};

export default CastCard;
