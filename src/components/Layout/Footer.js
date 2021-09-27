import React from "react";
import "./Footer.module.css";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>ⓒ {currentYear} Afik ziv.</p>
    </footer>
  );
};

export default Footer;
