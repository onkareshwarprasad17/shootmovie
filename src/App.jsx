import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./components/home/Home"));
const Details = lazy(() => import("./components/details/Details"));

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ActivityLoader from "./ActivityLoader";

import { getGenres, getImageUrl } from "./redux/appSlice";
import { fetchFromApi } from "./utils/api";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getImageConfig();
    getGenresList();
  }, []);

  const getImageConfig = async () => {
    try {
      const res = await fetchFromApi("/configuration");
      const url = {
        backdrop: res?.images?.secure_base_url + "original",
        poster: res?.images?.secure_base_url + "w500",
        profile: res?.images?.secure_base_url + "w185",
      };
      dispatch(getImageUrl(url));
    } catch (error) {
      console.error(error);
    }
  };

  const getGenresList = async () => {
    let promise = [];
    const genresMediaType = ["tv", "movie"];

    genresMediaType.forEach((type) => {
      promise.push(fetchFromApi(`/genre/${type}/list`));
    });

    const data = await Promise.all(promise);
    // const commonGenres = data[0].genres.filter((genre1) =>
    //   data[1].genres.some((genre2) => genre1.id === genre2.id)
    // );
    // dispatch(getGenres([...commonGenres]));

    const allGenres = [];
    data?.map((genreList) =>
      genreList?.genres.map(
        (genre) =>
          !allGenres.some((g) => g?.id === genre?.id) && allGenres.push(genre)
      )
    );

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <div className="content-container">
        <Suspense fallback={<ActivityLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/:mediaType/:id" element={<Details />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
