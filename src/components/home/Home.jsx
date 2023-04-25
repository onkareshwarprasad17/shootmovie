import React, { memo, useEffect, useState } from 'react';
import Hero from './hero/Hero';
import Trending from './trending/Trending';
import './style.css';
import Upcoming from './upcoming/Upcoming';
import TopRatedMovies from './topRated/TopRatedMovies';
import Explore from './explore/Explore';

const Home = () => {
  return (
    <>
      <section className="home">
        <Hero />
        <Trending />
        <Upcoming />
        <TopRatedMovies />
        <Explore />
      </section>
    </>
  );
};

export default memo(Home);
