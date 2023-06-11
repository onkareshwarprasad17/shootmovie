import React from "react";
import Logo from "../../assets/LogoIcon.svg";
import { HeartFilled } from "@ant-design/icons";

import "./style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="links">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
      </section>
      <div className="divider"></div>
      <section className="copyright">
        <span className="content">
          Created with{" "}
          <span>
            <HeartFilled />
          </span>{" "}
          by Onkareshwar
        </span>
      </section>
    </footer>
  );
};

export default Footer;
