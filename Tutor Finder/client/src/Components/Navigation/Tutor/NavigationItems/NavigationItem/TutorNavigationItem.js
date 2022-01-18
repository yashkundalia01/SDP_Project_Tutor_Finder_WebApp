import React from "react";
import "./TutorNavigationItem.css";
import { NavLink } from "react-router-dom";

const navigationItem = (props) => (
  <li className='NavigationItem'>
    <NavLink to={props.link} exact={props.exact} activeClassName={"active"}>
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
