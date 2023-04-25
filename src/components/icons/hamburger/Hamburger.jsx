import React from 'react';
import hamburgerIcon from '../../../assets/Hamburger.svg';

const Hamburger = ({ showMobileMenuHandler }) => {
  return (
    <img
      src={hamburgerIcon}
      className="open-hamburger"
      alt="hamburger icon"
      onClick={() => showMobileMenuHandler(true)}
    />
  );
};

export default Hamburger;
