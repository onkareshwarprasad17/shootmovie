import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import "./assets/style.css";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Movie from "./components/Movie";
import { AuthProvider } from "./components/context/context";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import Error from "./components/Error";
import appReducer from "./appReducer";
import { useDispatch, useSelector } from "react-redux";
import Beta from "./components/Beta";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  //#region using useState hook
  // const [loggedIn, setLoggedIn] = useState(false);

  // const providerValue = useMemo(
  //   () => ({ loggedIn, setLoggedIn }),
  //   [loggedIn, setLoggedIn]
  // );
  //#endregion

  //#region Using useReducer
  // const initialState = {
  //   loggedIn: false,
  // };

  // const [state, dispatch] = useReducer(appReducer, initialState);

  //#endregion

  return (
    <AuthProvider>
      <Beta />

      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <PrivateRoutes>
              <Movie />
            </PrivateRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </AuthProvider>
  );
}

export default React.memo(App);
