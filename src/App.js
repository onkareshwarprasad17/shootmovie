import React from 'react';
import Header from './components/Header';
import Login from './components/Login';
import './assets/style.css';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Movie from './components/Movie';
import Beta from './components/Beta';
import PrivateRoutes from './components/PrivateRoutes';
import InvalidRoute from './components/InvalidRoute';

function App() {
  return (
    <>
      <Beta />

      <Header />
      <Routes>
        <Route
          path="/home"
          exact
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route exact path="/login" element={<Login />} />
        <Route
          path="/movie/:id"
          element={
            <PrivateRoutes>
              <Movie />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<InvalidRoute />} />
      </Routes>

      <Footer />
    </>
  );
}

export default React.memo(App);
