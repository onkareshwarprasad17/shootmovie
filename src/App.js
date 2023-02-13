import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import "./assets/style.css";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Movie from "./components/Movie";
import { AppContext } from "./components/context/context";
import React, { useMemo, useReducer, useState } from "react";
import Error from "./components/Error";
import appReducer from "./appReducer";
import { useDispatch, useSelector } from "react-redux";

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

  // -------------- Using Redux Toolkit (useSelector) --------------
  const loggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      {/* <AppContext.Provider
        value={{ loggedIn: state.loggedIn, dispatch: dispatch }}
      > */}
      <AppContext.Provider value={loggedIn}>
        {loggedIn ? (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Login />} />

              <>
                <Route path="/home" element={<Home />} />
                <Route path="/movie/:id" element={<Movie />} />
              </>
            </Routes>

            <Footer />
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Error />} />
              <Route path="/movie/:id" element={<Error />} />
            </Routes>
          </>
        )}
      </AppContext.Provider>
    </>
  );
}

export default React.memo(App);
