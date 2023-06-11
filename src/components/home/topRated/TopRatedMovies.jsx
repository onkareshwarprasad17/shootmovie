import React, { useEffect, useState } from "react";
import useFetch from "../../../redux/hooks/useFetch";
import TopCarousel from "../../carousel/topCarousel/TopCarousel";

const TopRatedMovies = () => {
  const { data, loading } = useFetch("/movie/top_rated");
  const [topRatedMovies, setTopRatedMovies] = useState(null);

  useEffect(() => {
    const modifiedData = data?.results?.map((item) => {
      return {
        ...item,
        media_type: "movie",
      };
    });

    setTopRatedMovies(modifiedData?.slice(0, 10));
  }, [data]);

  return (
    <div className="topRated">
      <div className="heading">
        <div className="title">Top Rated Movies</div>
        {/* <div className="more">More</div> */}
      </div>

      <TopCarousel isLoading={loading} data={topRatedMovies} type={"detail"} />
    </div>
  );
};

export default TopRatedMovies;
