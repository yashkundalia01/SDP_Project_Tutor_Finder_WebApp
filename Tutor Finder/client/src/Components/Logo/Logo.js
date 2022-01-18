import React from "react";
import "./Logo.css";
import logoChat from "../../assets/images/icon.png";

const logo = (props) => (
  <div className='Logo'>
    <img src={logoChat} alt='Tutor Finder'></img>
  </div>
);

export default logo;
