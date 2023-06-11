import React from "react";
import Hero from "./hero/Hero";
import Trending from "./trending/Trending";
import Upcoming from "./upcoming/Upcoming";
import TopRatedMovies from "./topRated/TopRatedMovies";
import Explore from "./explore/Explore";

import "./style.css";

const Home = () => {
  return (
    <>
      <section className="home">
        <Hero />
        <Trending />
        <Upcoming />
        <TopRatedMovies />
        {/* <Explore /> */}
      </section>
    </>
  );
};

export default Home;
