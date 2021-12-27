import React, { Component } from "react";
import Toolbar from "../../../Components/Navigation/Tutor/Toolbar/TutorToolbar";
import SideDrawer from "../../../Components/Navigation/Tutor/SideDrawer/TutorSideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenedHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <div>
        <Toolbar open={this.sideDrawerOpenedHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}
export default Layout;
