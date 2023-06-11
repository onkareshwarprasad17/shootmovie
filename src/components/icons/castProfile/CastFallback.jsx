import React from "react";
import FallbackImage from "../../../assets/cast-fallback.svg";
import "./style.css";

const CastFallback = () => {
  return (
    <div className="castProfile-fallback">
      <img src={FallbackImage} alt="cast-profile" />
    </div>
  );
};

export default CastFallback;
