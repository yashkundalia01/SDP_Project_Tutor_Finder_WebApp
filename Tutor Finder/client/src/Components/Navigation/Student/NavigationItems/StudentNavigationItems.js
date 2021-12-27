import { Fragment, Component } from "react";
import "./StudentNavigationItems.css";
import NavigationItem from "./NavigationItem/StudentNavigationItem";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../../../../Store/actions";

class navigationItems extends Component {
  render() {
    const myStyle = {
      margin: "10px",
      display: "block",
      width: "100%",
      color: "white",
    };

    const authLinks = (
      <ul className='NavigationItems'>
        <NavigationItem link='/student/dashboard'> Dashboard </NavigationItem>
        <NavigationItem link='/student/post'>Post</NavigationItem>
        <NavigationItem link='/student/profile'> Profile </NavigationItem>
        <Link onClick={this.props.logout} to='/student/login' style={myStyle}>
          Logout
        </Link>
      </ul>
    );
    const guestLinks = (
      <ul className='NavigationItems'>
        <NavigationItem link='/student/register'> Register </NavigationItem>
        <NavigationItem link='/student/login'>Login</NavigationItem>
      </ul>
    );
    return (
      <Fragment>
        {!this.props.loading && (
          <Fragment>
            {this.props.isAuthenticated ? authLinks : guestLinks}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(action.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(navigationItems);
