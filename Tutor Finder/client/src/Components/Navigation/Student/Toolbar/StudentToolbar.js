import React from "react";
import "./Toolbar.css";
import Logo from "../../../Logo/Logo";
import NavigationItems from "../NavigationItems/StudentNavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => {
  return (
    <header className='Toolbar'>
      <DrawerToggle open={props.open} />
      <div className='Logo'>
        <Logo />
      </div>
      <nav className='DesktopOnly'>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
