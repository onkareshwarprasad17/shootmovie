import React from 'react';
import logo from '../../assets/LogoIcon.svg';
import { Link } from 'react-router-dom';

import './style.css';

const Header = () => {
  return (
    <header className={`header`}>
      <Link className="brand-logo" to={'/'}>
        <img src={logo} alt="ShootMovie-logo" />
        <span className="logo-text">SHOOTMovie</span>
      </Link>
    </header>
  );
};

export default Header;
