import React, { useContext } from "react";
import { Button, Layout, Menu, message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/context";

const Header = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const logoutUser = () => {
    auth.logout();
    navigate("/");
    message.success("You have logged out successfully!");
  };

  return (
    <Layout.Header className="header-container">
      <Menu mode="horizontal" className="header">
        <div className="logo">SHOOTMovie</div>
        {auth.user && (
          <Button
            type="primary"
            shape="round"
            className="logout-button"
            onClick={logoutUser}
          >
            Logout
          </Button>
        )}
      </Menu>
    </Layout.Header>
  );
};

export default Header;
