import React from "react";
import UpcomingCarousel from "../../carousel/upcomingCarousel/UpcomingCarousel";
import "./style.css";

const Upcoming = () => {
  return (
    <div className="upcoming">
      <div className="text-container">
        <div className="heading">
          <span className="first-letter">W</span>orth waiting for
        </div>
        <div className="overview">Watch trailer of the upcoming movies!</div>
      </div>
      <UpcomingCarousel />
      <div className={"background-ellipse"}></div>
    </div>
  );
};

export default Upcoming;
