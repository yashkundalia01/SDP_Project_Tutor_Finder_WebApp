import React from "react";
import "./SideDrawer.css";
import Logo from "../../../Logo/Logo";
import NavigationItems from "../NavigationItems/StudentNavigationItems";
import Backdrop from "../../../UI/Backdrop/Backdrop";

const StudentSideDrawer = (props) => {
  let attachedClasses = ["SideDrawer", "Close"];

  if (props.open) {
    attachedClasses = ["SideDrawer", "Open"];
  }

  return (
    <div>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className='Logo'>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </div>
  );
};

export default StudentSideDrawer;
