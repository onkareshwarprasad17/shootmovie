import React, { useContext, useEffect, useState } from "react";
import { Button, Layout, Menu, message } from "antd";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./context/context";
import { userLoggedOut } from "../appSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const loggedIn = useContext(AppContext);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(userLoggedOut());
    navigate("/");
    message.success("You have logged out successfully!");
  };

  return (
    <Layout.Header className="header-container">
      {loggedIn && (
        <Menu mode="horizontal" className="header">
          <div className="logo">SHOOTMovie</div>

          <Button
            type="primary"
            shape="round"
            className="logout-button"
            onClick={() => logoutUser()}
          >
            Logout
          </Button>
        </Menu>
      )}
    </Layout.Header>
  );
};

export default Header;
