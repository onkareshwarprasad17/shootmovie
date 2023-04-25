import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const Home = lazy(() => import('./components/home/Home'));
import { getGenres, getImageUrl } from './redux/appSlice';
import { fetchFromApi } from './utils/api';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Details from './components/details/Details';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getImageConfig();
    getGenresList();
  }, []);

  const getImageConfig = async () => {
    try {
      const res = await fetchFromApi('/configuration');
      const url = {
        backdrop: res?.images?.secure_base_url + 'original',
        poster: res?.images?.secure_base_url + 'original',
        profile: res?.images?.secure_base_url + 'original',
      };
      dispatch(getImageUrl(url));
    } catch (error) {
      console.error(error);
    }
  };

  const getGenresList = async () => {
    let promise = [];
    const genresMediaType = ['tv', 'movie'];

    genresMediaType.forEach((type) => {
      promise.push(fetchFromApi(`/genre/${type}/list`));
    });

    const data = await Promise.all(promise);
    // const commonGenres = data[0].genres.filter((genre1) =>
    //   data[1].genres.some((genre2) => genre1.id === genre2.id)
    // );
    // dispatch(getGenres([...commonGenres]));

    const allGenres = [];
    console.log(data);
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
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback="loading">
              <Home />
            </Suspense>
          }
        />
        <Route
          exact
          path="/:mediaType/:id"
          element={
            <Suspense fallback="loading">
              <Details />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
