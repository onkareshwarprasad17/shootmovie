import React from 'react';
import closeHamburgerIcon from '../../../assets/CloseHamburger.svg';

const CloseHamburger = ({ showMobileMenuHandler }) => {
  return (
    <img
      src={closeHamburgerIcon}
      className="close-hamburger"
      alt="close hamburger"
      onClick={() => showMobileMenuHandler(false)}
    />
  );
};

export default CloseHamburger;
