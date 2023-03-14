import React, { useContext } from 'react';
import { Button, Layout, Menu, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/context';

const Header = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const logoutUser = () => {
    localStorage.clear();
    auth.logout();
    navigate('/login');
    message.success('You have logged out successfully!');
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <Layout.Header className="header-container">
      <Menu mode="horizontal" className="header">
        <div className="logo" onClick={() => navigateToHome()}>
          SHOOTMovie
        </div>
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
